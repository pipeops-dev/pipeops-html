"use client";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect, useState } from "react";
import Image from "next/image";

// Define schemas for each step
const step1Schema = yup
  .object({
    hospitalName: yup.string().required("Hospital Name is required"),
    email: yup.string().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  })
  .required();

const step2Schema = yup
  .object({
    hospitalLocation: yup.string().required("Hospital Address is Required"),
    phone: yup
      .number("Phone number must be only numbers")
      .required("Phone Number is Required"),
  })
  .required();

const step3Schema = yup
  .object({
    logo: yup.mixed().required("Logo is Required"),
    color: yup.string().required("Color is Required"),
  })
  .required();

const agreementSchema = yup
  .object({
    agreeTerms: yup
      .bool()
      .oneOf([true], "You must accept the terms and conditions")
      .required(),
    agreePrivacy: yup
      .bool()
      .oneOf([true], "You must accept the privacy policy")
      .required(),
    verifyAccuracy: yup
      .bool()
      .oneOf([true], "You must verify the accuracy of the information")
      .required(),
  })
  .required();

const Step1 = ({ onNext, defaultValues }) => {
  const methods = useForm({
    resolver: yupResolver(step1Schema),
    defaultValues,
  });

  const onSubmit = (data) => {
    onNext(data);
  };

  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

  const handleViewPassword = () => {
    setViewPassword((view) => !view);
  };

  const handleViewConfirmPassword = () => {
    setViewConfirmPassword((view) => !view);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="lg:p-12 h-full relative"
      >
        <h2 className="text-4xl font-semibold mb-6">Basic Information</h2>

        <div className="flex flex-col mb-4">
          <div className="flex justify-between items-center">
            <label className="mb-1">Hospital Name</label>
            <p className="text-red-500 text-sm">
              {methods.formState.errors.hospitalName?.message}
            </p>
          </div>
          <input
            {...methods.register("hospitalName")}
            type="text"
            className={`outline-none border text-lg rounded-lg py-1 px-4 ${
              methods.formState.errors.hospitalName
                ? "border-red-500 focus:border-red-500"
                : "focus:border-blue-1"
            } `}
          />
        </div>

        <div className="flex flex-col mb-4">
          <div className="flex justify-between items-center">
            <label className="mb-1">Email</label>
            <p className="text-red-500 text-sm">
              {methods.formState.errors.email?.message}
            </p>
          </div>
          <input
            {...methods.register("email")}
            type="text"
            className={`outline-none border text-lg rounded-lg py-1 px-4 ${
              methods.formState.errors.email
                ? "border-red-500 focus:border-red-500"
                : "focus:border-blue-1"
            } `}
          />
        </div>

        <div className="flex flex-col mb-4">
          <div className="flex justify-between items-center">
            <label className="mb-1">Password</label>
            <p className="text-red-500 text-sm">
              {methods.formState.errors.password?.message}
            </p>
          </div>
          <div className="relative">
            <input
              {...methods.register("password")}
              type={viewPassword ? "text" : "password"}
              className={`outline-none border text-lg rounded-lg py-1 px-4 w-full ${
                methods.formState.errors.password
                  ? "border-red-500 focus:border-red-500"
                  : "focus:border-blue-1"
              } `}
            />
            <Image
              src={viewPassword ? "/images/view.svg" : "/images/view-off.svg"}
              alt="view password"
              width={28}
              height={28}
              className="absolute right-4 top-1 cursor-pointer"
              onClick={handleViewPassword}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <label className="mb-1">Confirm Password</label>
            <p className="text-red-500 text-sm">
              {methods.formState.errors.confirmPassword?.message}
            </p>
          </div>
          <div className="relative">
            <input
              {...methods.register("confirmPassword")}
              type={viewConfirmPassword ? "text" : "password"}
              className={`outline-none border text-lg rounded-lg py-1 px-4 w-full ${
                methods.formState.errors.confirmPassword
                  ? "border-red-500 focus:border-red-500"
                  : "focus:border-blue-1"
              } `}
            />
            <Image
              src={
                viewConfirmPassword
                  ? "/images/view.svg"
                  : "/images/view-off.svg"
              }
              alt="view password"
              width={28}
              height={28}
              className="absolute right-4 top-1 cursor-pointer"
              onClick={handleViewConfirmPassword}
            />
          </div>
        </div>
        <div className="lg:absolute mt-6 bottom-12 right-12">
          <button
            type="submit"
            className="bg-blue-1 px-6 py-3 text-lg rounded-lg font-semibold text-white flex items-center"
          >
            <span className="mr-2">Next</span>
            <Image
              src="/images/narrow.svg"
              alt="next arrow"
              width={20}
              height={20}
            />
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

const Step2 = ({ onNext, onBack, defaultValues }) => {
  const methods = useForm({
    resolver: yupResolver(step2Schema),
    defaultValues,
  });
  const onSubmit = (data) => {
    onNext(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="lg:p-12 h-full relative"
      >
        <h2 className="text-4xl font-semibold mb-6">Contact Information</h2>
        <div className="flex flex-col mb-4">
          <div className="flex justify-between items-center">
            <label className="mb-1">Address</label>
            <p className="text-red-500 text-sm">
              {methods.formState.errors.hospitalLocation?.message}
            </p>
          </div>
          <input
            {...methods.register("hospitalLocation")}
            type="text"
            className={`outline-none border text-lg rounded-lg py-1 px-4 ${
              methods.formState.errors.hospitalLocation
                ? "border-red-500 focus:border-red-500"
                : "focus:border-blue-1"
            } `}
          />
        </div>
        <div className="flex flex-col mb-4">
          <div className="flex justify-between items-center">
            <label className="mb-1">Phone Number</label>
            <p className="text-red-500 text-sm">
              {methods.formState.errors.phone?.message}
            </p>
          </div>
          <input
            {...methods.register("phone")}
            type="text"
            className={`outline-none border text-lg rounded-lg py-1 px-4 ${
              methods.formState.errors.phone
                ? "border-red-500 focus:border-red-500"
                : "focus:border-blue-1"
            } `}
          />
        </div>

        <div className="lg:absolute bottom-12 right-12 flex mt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 text-lg rounded-lg font-semibold text-blue-1 border-2 border-blue-1 flex items-center mr-6"
          >
            <Image
              src="/images/parrow.svg"
              alt="next arrow"
              width={20}
              height={20}
              className="mr-2"
            />
            <span>Back</span>
          </button>

          <button
            type="submit"
            className="bg-blue-1 px-6 py-3 text-lg rounded-lg font-semibold text-white flex items-center"
          >
            <span className="mr-2">Next</span>
            <Image
              src="/images/narrow.svg"
              alt="next arrow"
              width={20}
              height={20}
            />
          </button>
        </div>
      </form>
    </FormProvider>
  );
};


const Step3 = ({ onBack, onSubmit, defaultValues }) => {
  const methods = useForm({
    resolver: yupResolver(step3Schema),
    defaultValues,
  });

  const [filePreview, setFilePreview] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = methods;

  const logo = watch("logo");
  const color = watch("color"); // Watch the color field

  useEffect(() => {
    if (logo && logo.length > 0) {
      const file = logo[0];
      const previewUrl = URL.createObjectURL(file);
      setFilePreview(previewUrl);

      return () => URL.revokeObjectURL(previewUrl);
    }
  }, [logo]);

  const handleFormSubmit = (data) => {
    onSubmit(data); // No need to merge color separately
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        className="lg:p-12 h-full relative"
      >
        <h2 className="text-4xl font-semibold mb-6">Branding</h2>
        <div className="mb-4">
          <p className="mb-1">Hospital Logo</p>
          <label className="flex justify-center items-center border border-black border-dashed rounded-lg cursor-pointer py-16 w-full">
            <input {...register("logo")} type="file" className="hidden" />
            {filePreview ? (
              <div className="relative">
                <img
                  src={filePreview}
                  alt="preview"
                  className="h-20 w-auto object-cover"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Image
                  src="/images/upload-icon.svg"
                  alt="upload-icon"
                  width={48}
                  height={48}
                />
              </div>
            )}
          </label>
          {errors.logo && (
            <p className="text-red-500 mt-2">{errors.logo.message}</p>
          )}
        </div>
        <div>
          <p className="mb-1">Color</p>
          <div className="flex items-center">
            <input
              type="color"
              {...register("color")} // Register the color input properly
              className="mr-2"
            />
            <span>{color}</span> {/* Display the selected color */}
          </div>
          {errors.color && (
            <p className="text-red-500 mt-2">{errors.color.message}</p>
          )}
        </div>
        <div className="lg:absolute bottom-12 right-12 flex mt-6">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 text-lg rounded-lg font-semibold text-blue-1 border-2 border-blue-1 flex items-center mr-6"
          >
            <Image
              src="/images/parrow.svg"
              alt="next arrow"
              width={20}
              height={20}
              className="mr-2"
            />
            <span>Back</span>
          </button>

          <button
            type="submit"
            className="bg-blue-1 px-6 py-3 text-lg rounded-lg font-semibold text-white flex items-center"
          >
            <span className="mr-2">Next</span>
            <Image
              src="/images/narrow.svg"
              alt="next arrow"
              width={20}
              height={20}
            />
          </button>
        </div>
      </form>
    </FormProvider>
  );
};



const Step4 = ({ formData, onBack, onSubmit }) => {
  const methods = useForm({
    resolver: yupResolver(agreementSchema),
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        className="lg:p-12 h-full relative overflow-y-scroll"
      >
        <h2 className="text-4xl font-semibold mb-6">
          Verification and Agreement
        </h2>

        <h3 className="text-2xl font-semibold mb-4">Review Your Information</h3>
        <div className="mb-4">
          <p>
            <strong>Hospital Name:</strong> {formData.hospitalName}
          </p>
          <p>
            <strong>Email:</strong> {formData.email}
          </p>
          <p>
            <strong>Address:</strong> {formData.hospitalLocation}
          </p>
          <p>
            <strong>Phone Number:</strong> {formData.phone}
          </p>
          <p>
            <strong>Color:</strong>{" "}
            <span style={{ color: formData.color }}>{formData.color} <span className="w-8 h-4 inline-block" style={{ backgroundColor: formData.color }}></span> </span>
          </p>
          <div>
            <strong>Logo:</strong>
            {formData.logo && (
              <div>
                <img
                  src={URL.createObjectURL(formData.logo[0])}
                  alt="Logo"
                  className="h-20 w-auto object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              {...methods.register("agreeTerms")}
              className="mr-2"
            />
            <label className="text-sm">
              I agree to the{" "}
              <a
                href="/terms"
                target="_blank"
                className="text-blue-500 underline"
              >
                Terms and Conditions
              </a>
              .
            </label>
          </div>
          {methods.formState.errors.agreeTerms && (
            <p className="text-red-500 text-sm">
              {methods.formState.errors.agreeTerms.message}
            </p>
          )}

          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              {...methods.register("agreePrivacy")}
              className="mr-2"
            />
            <label className="text-sm">
              I consent to the{" "}
              <a
                href="/privacy"
                target="_blank"
                className="text-blue-500 underline"
              >
                Privacy Policy
              </a>
              .
            </label>
          </div>
          {methods.formState.errors.agreePrivacy && (
            <p className="text-red-500 text-sm">
              {methods.formState.errors.agreePrivacy.message}
            </p>
          )}

          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              {...methods.register("verifyAccuracy")}
              className="mr-2"
            />
            <label className="text-sm">
              I verify that the information provided is accurate and complete.
            </label>
          </div>
          {methods.formState.errors.verifyAccuracy && (
            <p className="text-red-500 text-sm">
              {methods.formState.errors.verifyAccuracy.message}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 text-lg rounded-lg font-semibold text-blue-1 border-2 border-blue-1 flex items-center mr-6"
          >
            <Image
              src="/images/parrow.svg"
              alt="previous arrow"
              width={20}
              height={20}
              className="mr-2"
            />
            <span>Back</span>
          </button>

          <button
            type="submit"
            className="bg-blue-1 px-6 py-3 text-lg rounded-lg font-semibold text-white flex items-center"
          >
            <span className="mr-2">Submit</span>
            <Image
              src="/images/narrow.svg"
              alt="submit arrow"
              width={20}
              height={20}
            />
          </button>
        </div>
      </form>
    </FormProvider>
  );
};


export default function MultiStep() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});

  const handleNext = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  const handleFinalSubmit = (data) => {
    const finalData = { ...formData, ...data };
    console.log(finalData);
  };

  return (
    <div className="w-full lg:h-[620px] bg-white lg:rounded-3xl lg:p-4 flex">
      <div className="w-1/3 h-full bg-blue-1 rounded-2xl p-12 hidden lg:block">
        <div className="flex mb-6">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-xl mr-4 bg-white ${step === 1 ? 'text-blue-1' : ''}`}>01</div>
          <div className="flex flex-col">
            <span className="text-sm text-white">Step 1</span>
            <h4 className={`text-white text-lg ${step === 1 ? 'font-semibold' : ''}`}>Basic Information</h4>
          </div>
        </div>
        <div className="flex mb-6">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-xl mr-4 bg-white ${step === 2 ? 'text-blue-1' : ''}`}>02</div>
          <div className="flex flex-col">
            <span className="text-sm text-white">Step 2</span>
            <h4 className={`text-white text-lg ${step === 2 ? 'font-semibold' : ''}`}>Contact Information</h4>
          </div>
        </div>
        <div className="flex mb-6">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-xl mr-4 bg-white ${step === 3 ? 'text-blue-1' : ''}`}>03</div>
          <div className="flex flex-col">
            <span className="text-sm text-white">Step 3</span>
            <h4 className={`text-white text-lg ${step === 3 ? 'font-semibold' : ''}`}>Branding</h4>
          </div>
        </div>
        <div className="flex mb-6">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-xl mr-4 bg-white ${step === 4 ? 'text-blue-1' : ''}`}>04</div>
          <div className="flex flex-col">
            <span className="text-sm text-white">Step 4</span>
            <h4 className={`text-white text-lg ${step === 4 ? 'font-semibold' : ''}`}>Verification and Agreement</h4>
          </div>
        </div>
      </div>
      <div className="lg:w-2/3 w-full">
        {step === 1 && <Step1 onNext={handleNext} defaultValues={formData} />}
        {step === 2 && (
          <Step2
            onNext={handleNext}
            onBack={handleBack}
            defaultValues={formData}
          />
        )}
        {step === 3 && (
          <Step3
            onBack={handleBack}
            onSubmit={handleNext}
            defaultValues={formData}
          />
        )}
        {step === 4 && (
          <Step4
            formData={formData}
            onBack={handleBack}
            onSubmit={handleFinalSubmit}
          />
        )}
      </div>
    </div>
  );
}
