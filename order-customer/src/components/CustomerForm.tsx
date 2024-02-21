import React, {useState} from 'react';

interface CartUserFormProps {
  onFormSubmit: (name: string, phone: string, address: string) => void;
}

const CartUserForm: React.FC<CartUserFormProps> = ({ onFormSubmit }) => {

  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onFormSubmit(name, phone, address);
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4 items-center">
      <label htmlFor="name" className="block">
        Name:
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-black rounded px-4 py-2 w-1/3"
      />

      <label htmlFor="phone" className="block">
        Phone:
      </label>
      <input
        type="text"
        id="phone"
        name="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border border-black rounded px-4 py-2 w-1/3"
      />

      <label htmlFor="address" className="block">
        Address:
      </label>
      <input
        type="text"
        id="address"
        name="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="border border-black rounded px-4 py-2 w-1/3"
      />

      <button type="submit" disabled={!name || !phone || !address} className="bg-black text-white py-2 px-4 rounded">
        Submit
      </button>
    </form>
  );
};

export default CartUserForm;