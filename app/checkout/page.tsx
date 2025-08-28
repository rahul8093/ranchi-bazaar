'use client'

import { useState } from 'react'
import { useCart } from '@/app/context/CartContext'
import toast from 'react-hot-toast'
import { RazorpayPaymentResponse } from '../lib/saleor/types/razorpay'
import { loadRazorpayScript } from '../lib/razorpay/loadScript'

export default function CheckoutPage() {
  const { cartItems, totalPrice, cartLoading } = useCart()

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    zip: '',
    address: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {

    const scriptLoaded = await loadRazorpayScript()
    if (!scriptLoaded) {
      toast.error("Failed to load Razorpay SDK")
      return
    }
    // Basic validation
    if (
      !form.fullName ||
      !form.email ||
      !form.address ||
      !form.city ||
      !form.zip ||
      !form.country
    ) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)

    try {
      // Step 1: Create Saleor order via your existing API
      const checkoutResponse = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          address: {
            firstName: form.fullName.split(' ')[0],
            lastName: form.fullName.split(' ').slice(1).join(' ') || 'Doe',
            phone: form.phone,
            country: 'IN',
            city: form.city,
            postalCode: form.zip,
            streetAddress1: form.address,
            countryArea: 'Jharkhand', // optional
          },
        }),
      })

      const checkoutData = await checkoutResponse.json()

      if (!checkoutResponse.ok) {
        toast.error(checkoutData.error || 'Checkout failed')
        setLoading(false)
        return
      }

      // You should get Saleor order ID here (adjust according to your response)
      const saleorOrderId = checkoutData.saleorOrderId
      if (!saleorOrderId) {
        toast.error('Saleor order ID not found')
        setLoading(false)
        return
      }

      // Step 2: Create Razorpay order
      const razorpayOrderRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalPrice, // amount in INR (decimal)
          receipt: saleorOrderId,
        }),
      })

      const razorpayOrder = await razorpayOrderRes.json()

      if (!razorpayOrderRes.ok || razorpayOrder.error) {
        toast.error('Failed to create Razorpay order')
        setLoading(false)
        return
      }

      // Step 3: Open Razorpay Checkout UI
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        order_id: razorpayOrder.id,
        handler: async (response: RazorpayPaymentResponse) => {
          // Step 4: Verify payment on your backend
          const verifyRes = await fetch('/api/razorpay/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              saleor_order_id: saleorOrderId,
            }),
          })

          const verifyData = await verifyRes.json()

          if (verifyRes.ok && verifyData.success) {
            toast.success('Payment successful! Order completed.')
            // Optionally redirect to thank-you page
            // router.push('/thank-you')
          } else {
            toast.error('Payment verification failed.')
          }
          setLoading(false)
        },
        prefill: {
          name: form.fullName,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: '#3399cc',
        },
      }

      const rzp = new window.Razorpay(options);
      console.log(rzp, 'rzp')
      rzp.open()
    } catch (error) {
      toast.error('Something went wrong during payment')
      console.error(error)
      setLoading(false)
    }
  }

  if (cartLoading) return <p>Loading cart...</p>

  if (cartItems.length === 0)
    return <p>Your cart is empty. Add some products before checkout.</p>

  return (
    <main className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">
      {/* SHIPPING FORM */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={form.fullName}
            onChange={e => handleChange('fullName', e.target.value)}
            className="col-span-2 p-2 border"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => handleChange('email', e.target.value)}
            className="col-span-2 p-2 border"
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={form.phone}
            onChange={e => handleChange('phone', e.target.value)}
            className="col-span-2 p-2 border"
          />
          <input
            type="text"
            placeholder="Country Code (e.g. IN)"
            value={form.country}
            onChange={e => handleChange('country', e.target.value)}
            className="p-2 border"
            required
          />
          <input
            type="text"
            placeholder="City"
            value={form.city}
            onChange={e => handleChange('city', e.target.value)}
            className="p-2 border"
            required
          />
          <input
            type="text"
            placeholder="ZIP Code"
            value={form.zip}
            onChange={e => handleChange('zip', e.target.value)}
            className="p-2 border"
            required
          />
          <input
            type="text"
            placeholder="Street Address"
            value={form.address}
            onChange={e => handleChange('address', e.target.value)}
            className="col-span-2 p-2 border"
            required
          />
        </div>
        <button
          // disabled={loading}
          onClick={handleSubmit}
          className="mt-6 w-full py-3 bg-green-600 text-white font-bold rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </section>

      {/* CART SUMMARY */}
      <section className="bg-gray-100 p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {cartItems.map(item => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>
              {item.variant.name} x{item.quantity}
            </span>
            <span>${item.variant.pricing.price?.gross.amount.toFixed(2)}</span>
          </div>
        ))}
        <hr className="my-4" />
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
      </section>
    </main>
  )
}
