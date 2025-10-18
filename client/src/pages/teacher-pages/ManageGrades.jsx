import { useAuthStore } from "../../context/useAuthStore"
import { useAllStudentGrades } from "../../hooks/useGrades";


const ManageGrades = () => {
  const {user}=useAuthStore();
  const {data:grades,isPending,isError}=useAllStudentGrades(user?.id);

console.log("auth data:",user);
console.log("all student grades data:",grades);


  if(isPending) return <p>parkhinu hos students grade load vairaxa....</p>;
  if(isError) return <p>error aayo students grade load garda</p>;
 
  return (
    <div className="space-y-6 bg-gradient-to-br from-green-50 to-white rounded-lg shadow-md">
    <h2 className="text-2xl font-bold text-green-800 text-center pt-8"> All student grades </h2>
    {grades.length===0?(<p>STUDENT KO MARKS AAXAINA</p>):(
     <div >
      <div className="text-right mb-2 mr-5">
       
      <button 
      className="border-2 border-green-500 px-4 py-2 rounded 
      text-green-500 font-semibold hover:bg-green-500 hover:text-white "
      >Add Grade</button>
      </div>
      
      <table className="w-full bg-white shadow rounded ">
        <thead className="bg-green-100 text-left">
          <tr>
            <th className="p-3">Student Name</th>
            <th className="p-3">Course Name</th>
            <th className="p-3">Grade</th> 
            <th className="p-3">Remarks</th>
            <th className="p-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white">
         {grades.map((val,index)=>(
          <tr key={ `${val.grade_id}` }
          className="border-t hover:bg-green-50">
            <td className="p-3">{val.student_name}</td>
            <td className="p-3">{val.course_name}</td>
            <td className="p-3">{val.score}</td>
            <td className="p-3">{val.remarks}</td>
             <td className='flex p-3 justify-evenly mr-2 mt-2 mb-2 font-semibold '>
                <button onClick={() => navigate(`/attendanceForm/${record.id}`)}
                  className='border-2 rounded border-blue-500 px-2 py-1 
                   text-blue-500 hover:bg-blue-500 hover:text-white'
                  >Update</button>
              <button onClick={()=>handleDelete(record.id)}
                className='border-2 rounded border-red-500 px-2 py-1 
                   text-red-500 hover:bg-red-500 hover:text-white'
                   >delete</button>
                   
              </td>
          
            
            
          </tr>
         ))}
        </tbody>
      </table>
     </div>
    )}
    </div>
  )
}

export default ManageGrades
