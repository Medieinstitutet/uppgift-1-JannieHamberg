
import React from 'react';
import { ICustomer } from '../Interfaces/ICustomer';

interface ICustomersAdmin {
  customers: ICustomer[];
  onViewProfile: (customerId: string) => void;
}

export const CustomerAdmin: React.FC<ICustomersAdmin> = ({ customers, onViewProfile }) => {
    console.log("All Customers:", customers);
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Customer ID/Email
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                First Name/LastName
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Address
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => {
              console.log("Rendering customer with ID:", customer._id, "Customer details:", customer);
              return (
                <tr key={customer._id}>
                  <td>{customer._id}</td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {`${customer.firstName} ${customer.lastName}`}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    {customer.address ? customer.address.address1 : 'N/A'}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                    {customer.address && customer.address.address2 ? customer.address.address2 : 'N/A'}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                    {customer.address ? customer.address.zipcode : 'N/A'}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                    {customer.address ? customer.address.city : 'N/A'}
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                    {customer.address ? customer.address.country : 'N/A'}
                  </td>
                  <td>
                    <button onClick={() => onViewProfile(customer._id)}>
                      View Profile
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };
  
  
