import GrievanceForm from "../components/grievanceForm.jsx";

function Home() {
  return (
    <div className="page-container">
      <h1>Grievance Form</h1>
      <p>As requested, you can submit your grievances for my viewing pleasure:</p>
      <GrievanceForm />
    </div>
  );
}

export default Home;
