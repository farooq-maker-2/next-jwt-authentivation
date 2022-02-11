import React, {useEffect, useState} from "react";
import AllTime from "../../pages/all_time_best";
import TrendingCourses from "../../pages/top_trending";
import AvailableCourses from "../../pages/available_courses";
import {getAllCourses} from "../../lib/lib";
import CourseCard from "../../components/cards/CourseCard";
import SearchTeacher from "../../components/SearchTeacher";

const AllCourses = (props) => {

    const [courses, setCourses] = useState(props.courses);
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        getAllCourses(pageIndex).then(res => {
            if (res.data.success && res.data.success === true) {
                setCourses(res.data.data)
                if (res.data.data.length === 0 && pageIndex > 0) {
                    setPageIndex(pageIndex - 1);
                }
            } else {
                window.alert("failed to fetch courses")
            }
        }).catch(err => console.log("Error ", err));
    }, [pageIndex]);

    let coursesList = <strong>no courses available!!!</strong>
    if (props.courses) {
        coursesList = props.courses?.map((course) => (
            <CourseCard key={course.id} course={course}/>
        ));
    } else if (courses && courses.length > 0) {
        coursesList = courses?.map((course) => (
            <CourseCard key={course.id} course={course}/>
        ))
    }

    return (
        <div className="w-100">
            <SearchTeacher/>
            <div className="d-inline-block margin-right-50 panel-width-30">
                <AvailableCourses props={props}/>
            </div>
            <div className="d-inline-block margin-right-50 panel-width-30">
                <AllTime/>
            </div>
            <div className="d-inline-block panel-width-30">
                <TrendingCourses/>
            </div>
            {/*<Pagination pageIndex={pageIndex} setPageIndex={setPageIndex}/>*/}
        </div>
    );
}

export default AllCourses;