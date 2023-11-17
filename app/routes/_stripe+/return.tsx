import React, { useEffect, useState } from 'react';
import { type DataFunctionArgs, redirect, json } from '@remix-run/node';
import handler from '~/lib/checkout_sessions';
import { useLoaderData } from '@remix-run/react';

export const loader = async ({ params } : DataFunctionArgs) => {
  let query = params.session_id;
  let session = await handler(query, 'GET')
    .then((res) => json(res))
    .catch((err) => console.error(err));

  return {session};
}

export default function Return() {
  const data = useLoaderData<typeof loader>();
  console.log('data-not-user', data)
  const [status, setStatus] = useState<string>();
  const [customerEmail, setCustomerEmail] = useState('');

  if (status === 'open') {
    return (
      redirect('/')
    )
  }

  if (status === 'complete') {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to {customerEmail}.

          If you have any questions, please email <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    )
  }

  return null;
}