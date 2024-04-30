
import React  from 'react';
import { ICustomer } from '../Interfaces/ICustomer';

interface ICustomersAdmin {
  customers: ICustomer[];
  onViewProfile: (customerId: string) => void;
}

export const CustomerAdmin: React.FC<ICustomersAdmin> = ({ customers, onViewProfile }) => {
    /* console.log("All Customers:", customers);
    useEffect(() => {
        console.log('Customers or onViewProfile changed');
      }, [customers, onViewProfile]); */
      return(
      <div className="overflow-x-auto">
      <table className="min-w-full leading-normal">
          <thead>
              <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Customer ID/Email
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      First Name/Last Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Address
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"></th>  
              </tr>
          </thead>
          <tbody>
              {customers.map((customer) => (
                  <tr key={customer.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {customer.id}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {`${customer.firstName} ${customer.lastName}`}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {customer.address1 || 'N/A'}
                          <br />
                          {customer.city || 'N/A'} {customer.zipcode || 'N/A'}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right">
                          <button onClick={() => onViewProfile(customer.id)} className="text-indigo-600 hover:text-indigo-900">
                              View Profile
                          </button>
                      </td>
                  </tr>
              ))}
          </tbody>
      </table>
  </div>
);
};
  
