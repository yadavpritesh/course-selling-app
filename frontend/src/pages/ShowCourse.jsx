// import { useContext } from "react";
// import { CourseDetails } from "../context/Context";
import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import {
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  Paper,
  Stack,
} from "@mui/material";
import { useAuthContext } from "../hooks/useAuthContext";

const ShowCourse = () => {
  const { user } = useAuthContext();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${user.token}`);
      const response = await fetch("http://localhost:3000/admin/courses", {
        method: "GET",
        headers: headers,
      });

      const data = await response.json();

      setCourses(data.courses);
    };
    fetchData();
  }, [user]);

  if (courses.length === 0) {
    return (
      <div>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          // onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }

  return (
    <div>
      <Grid container sx={{ flexGrow: 1 }} spacing={2}>
        {/* <div>{authenticated && <PermanentDrawerLeft />}</div> */}
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            {courses &&
              courses.map((course) => {
                return (
                  <Paper key={course._id} sx={{ margin: 4 }}>
                    <Cards
                      title={course.title}
                      description={course.description}
                      courseId={course._id}
                    />
                  </Paper>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default ShowCourse;
