import { Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Hero from "../assets/Hero.jpg";
import Google from "../assets/google.png";
import Airbnb from "../assets/airbnb.png";
import Cm from "../assets/creativeMarket.png";
import Amazon from "../assets/amazon.png";
import Shopify from "../assets/shopify.png";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center space-x-10 xl:space-x-20">
        <div className="lg:text-5xl md:text-4xl text-2xl font-semibold flex flex-col">
          <div className="mb-6 whitespace-nowrap">
            Gain expertise in your chosen field,
          </div>
          <div className="mb-6 whitespace-nowrap">
            explore new horizons, and accelerate
          </div>
          <div className="mb-8 text-blue-500 whitespace-nowrap">
            your career growth
          </div>
          <div className="text-base font-medium text-gray-500 max-w-[70%]">
            {`With CourseHere, you have the key to success right at your
            fingertips. Embark on a transformative learning experience designed
            to inspire, empower, and guide you towards greatness. Join a global
            community of learners, connect with industry experts, and ignite
            your passion for continuous learning. Whether you're a student,
            professional, or lifelong learner, CourseHere offers a diverse range
            of courses tailored to your unique goals and aspirations.`}
          </div>
          <div className="mt-10 flex  items-center  space-x-8 text-xl">
            {!user && (
              <Button onClick={() => navigate("/signup")}>Get started</Button>
            )}
            <Button
              onClick={() => {
                if (user === null) {
                  navigate("/login");
                } else {
                  navigate("/courses");
                }
              }}
              variant="contained"
              sx={{
                color: "#fff",
              }}
            >
              Courses
            </Button>
          </div>
        </div>
        <div className="min-w-[20%] max-w-[40%]">
          <img
            src={Hero}
            alt="image here"
            className="h-[540px] w-full object-contain "
          />
        </div>
      </div>
      <Grid
        sx={{ flexGrow: 1, margin: 5 }}
        container
        spacing={12}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item xs={12}>
          <Grid container justifyContent="between" spacing={2}>
            <img src={Google} className="bg-white md:h-16" alt="" />

            <img src={Airbnb} className="bg-white md:h-16" alt="" />

            <img src={Shopify} className="bg-white md:h-16" alt="" />

            <img src={Cm} className="bg-white md:h-16" alt="" />

            <img src={Amazon} className="bg-white md:h-16" alt="" />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
