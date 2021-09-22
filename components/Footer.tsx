import config from "config";

const { title, author } = config.appData;

const Footer = () => (
  <footer className="bg-secondary text-center text-white py-2">
    {author} | {title}&trade; | &copy;2021
  </footer>
);

export default Footer;
