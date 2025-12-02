'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function SignupPage() {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().min(2, 'Too short').required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().min(6, 'Min 6 characters').required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Required'),
      acceptTerms: Yup.boolean().oneOf([true], 'You must accept terms'),
    }),
    onSubmit: async (values) => {
      // TODO: call your signup API here
      console.log(values);
    },
  });

  const fieldClass = (name: keyof typeof formik.values) =>
    `block w-full border ${
      formik.touched[name] && formik.errors[name]
        ? 'border-red-400'
        : 'border-gray-300'
    } rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-300 transition`;

  return (
    <div className="min-h-screen flex">
      {/* Left fashion visual */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-tr from-pink-100 to-purple-200 items-center justify-center">
        <div className="p-8 text-center">
          <img src="/fashion.svg" alt="Fashion" className="w-64 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-purple-900 mb-2">
            Join the Style Club
          </h2>
          <p className="text-lg text-purple-700">
            Create your account to unlock members-only drops and exclusive offers.
          </p>
        </div>
      </div>

      {/* Right sign up form */}
      <div className="flex w-full lg:w-1/2 bg-white items-center justify-center">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-md p-8 space-y-6 shadow-xl rounded-lg bg-white"
        >
          <h1 className="text-3xl font-extrabold text-center text-purple-800">
            Create your account
          </h1>

          {/* Full name */}
          <div>
            <label
              htmlFor="fullName"
              className="block mb-2 text-sm font-semibold text-purple-700"
            >
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              className={fieldClass('fullName')}
              placeholder="Alex Carter"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.fullName}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-semibold text-purple-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className={fieldClass('email')}
              placeholder="you@email.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-semibold text-purple-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className={fieldClass('password')}
              placeholder="Minimum 6 characters"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Confirm password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-semibold text-purple-700"
            >
              Confirm password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className={fieldClass('confirmPassword')}
              placeholder="Re-type your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2">
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-400"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.acceptTerms}
            />
            <label
              htmlFor="acceptTerms"
              className="text-sm text-gray-600 cursor-pointer"
            >
              I agree to the Terms & Privacy Policy
            </label>
          </div>
          {formik.touched.acceptTerms && formik.errors.acceptTerms && (
            <p className="mt-1 text-sm text-red-500">
              {formik.errors.acceptTerms}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:from-pink-500 hover:to-purple-600 transition"
          >
            Sign up
          </button>

          <p className="text-center text-sm text-purple-700">
            Already have an account?{' '}
            <a href="/login" className="font-semibold hover:underline">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
