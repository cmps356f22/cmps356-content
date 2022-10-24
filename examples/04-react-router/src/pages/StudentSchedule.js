import { Link, useParams } from 'react-router-dom';
const StudentSchedule = () => {
  const { studentId, semester } = useParams();

  return (
    <section> 
      <br></br>
      <div>StudentId: {studentId}</div>
      <div>Semester: {semester}</div>
    </section>
  );
};

export default StudentSchedule;
