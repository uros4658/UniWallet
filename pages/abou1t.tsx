import { useRouter } from 'next/router';

const AboutPage1: React.FC = () => {
  const router = useRouter();
  const { message } = router.query;

  return (
    <div>
      <h1>About Us</h1>
      <p>This is the about page.</p>
      <p>Message: {message}</p>
    </div>
  );
};

export default AboutPage1;