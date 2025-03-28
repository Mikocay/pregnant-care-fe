const usePricing = () => {
  //* Get plan from data
  const plans = [
    // free: {
    //   id: '67b45876e415721141a13ef1',
    //   name: 'Free',
    //   price: 0,
    //   type: 'free',
    //   description: 'Unleash the power of automation',
    //   isActive: false,
    //   benefits: [
    //     'Access to all basics',
    //     'No credit card required',
    //     'Experience the Platform',
    //   ],
    //   createdAt: '2025-02-18T09:52:54.050Z',
    //   updatedAt: '2025-02-18T09:52:54.050Z',
    // },
    {
      id: '67b45904e415721141a13ef7',
      name: 'Life Time Package',
      price: 199,
      type: 'lifetime',
      description: 'Advanced tools to take your work to the next level',
      isActive: true,
      benefits: [
        'All features locked',
        'Exclusive lifetime',
        'No recurring payment',
      ],
      createdAt: '2025-02-18T09:55:16.976Z',
      updatedAt: '2025-02-18T09:55:16.976Z',
    },
    {
      id: '67b45958e415721141a13efa',
      name: '1 Month',
      price: 19,
      type: '1-month',
      description: 'Advanced tools to take your work to the next level',
      isActive: true,
      benefits: [
        'Full access to all',
        'Priority customer support',
        'Cancel anytime with no extra charges',
      ],
      createdAt: '2025-02-18T09:56:40.960Z',
      updatedAt: '2025-02-18T09:56:40.960Z',
    },
    {
      id: '67b759703aca1efa0ea07abb',
      name: 'Free Trial',
      price: 0,
      type: 'freemium',
      description: 'Unleash the power of automation',
      isActive: true,
      benefits: [
        'Access to all basics',
        'No credit card required',
        'Experience the Platform',
      ],
      createdAt: '2025-02-20T16:33:52.188Z',
      updatedAt: '2025-02-20T16:33:52.188Z',
    },
  ];

  return {
    plans,
  };
};

export default usePricing;
