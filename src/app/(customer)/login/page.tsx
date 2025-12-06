"use client"
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function LoginPage() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password is too short').required('Required'),
    }),
    onSubmit: (values) => {
      // TODO: handle authentication
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="min-h-screen flex">
      {/* Image or left-side brand banner */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-tr from-pink-100 to-purple-200 items-center justify-center">
        <div className="p-8 text-center">
          <img src="/fashion.svg" alt="Fashion" className="w-64 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-purple-900 mb-2">Welcome Back!</h2>
          <p className="text-lg text-purple-700">Discover the latest trends<br/>and exclusive collections.</p>
        </div>
      </div>
      {/* Login form */}
      <div className="flex w-full lg:w-1/2 bg-white items-center justify-center">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full max-w-md p-8 space-y-8 shadow-xl rounded-lg bg-white"
        >
          <h1 className="text-3xl font-extrabold text-center text-purple-800">Sign in to your account</h1>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-semibold text-purple-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              className={`block w-full border ${formik.touched.email && formik.errors.email ? 'border-red-400' : 'border-gray-300'} rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-300 transition`}
              placeholder="you@email.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
            ) : null}
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-semibold text-purple-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className={`block w-full border ${formik.touched.password && formik.errors.password ? 'border-red-400' : 'border-gray-300'} rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-300 transition`}
              placeholder="Your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-400 to-purple-500 text-white font-semibold rounded-lg shadow-md hover:from-pink-500 hover:to-purple-600 transition"
          >
            Log In
          </button>
          <div className="flex justify-between text-sm text-purple-600">
            <a href="/forgot-password" className="hover:underline">Forgot Password?</a>
            <a href="/signup" className="hover:underline">Create Account</a>
          </div>
        </form>
      </div>
    </div>
  );
}
