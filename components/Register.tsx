import RegisterForm from "@/components/RegisterForm";
import ClientOnly from "@/components/ClientOnly";

const Register = () => (
 
    <div className="py-5">
      <h2 className="display-4">Register</h2>
      <br />
      <ClientOnly>
        <RegisterForm />
      </ClientOnly>
    </div>
);

export default Register;
