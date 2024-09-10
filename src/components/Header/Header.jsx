import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  return (
    <header className="bg-gray-900 text-white py-4 px-6 flex fixed w-full justify-between z-50">
      <h1>Asset Management</h1>
      <AccountCircleIcon />
    </header>
  );
};

export default Header;
