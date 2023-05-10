import { Forbidden, NotFound } from 'http-errors';
import { Customer } from '../models';

async function getCustomers() {
  const customers = await Customer.scope('data').findAll();
  if (!customers) throw new NotFound('no_customers_in_base');
  return customers;
}

async function createCustomer({ employment, userId }) {
  return await Customer.create({
    userId,
    employment,
  });
}

async function getCustomerById({ id }) {
  const customer = await Customer.scope('data').findByPk(id);
  if (!customer) throw new NotFound('no_customer_in_base');
  return customer;
}

async function updateCustomer(
  {
    params: { id },
    body: { employment },
  },
) {
  const customer = await Customer.scope('data').findByPk(id);
  if (!customer) throw new NotFound('no_customer_in_base');

  await customer.update({
    employment,
  });

  return customer;
}

async function deleteCustomer({ params, user }) {
  const customerToDelete = await Customer.scope('data').findByPk(params.id);
  if (!customerToDelete) throw new NotFound('no_user_in_base');

  if (customerToDelete.user.id !== user.id) throw new Forbidden('You can delete only yourself account');

  await customerToDelete.destroy();
}

export {
  getCustomers,
  createCustomer,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
};
