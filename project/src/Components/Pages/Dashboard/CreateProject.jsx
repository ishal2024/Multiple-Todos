import { FolderPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function CreateProjectBox() {

  const navigate = useNavigate()

  return (
    <div 
    onClick={() => navigate('/create')}
    className="w-70 sm:w-80 h-36 bg-gradient-to-r from-blue-300 to-blue-500 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300  mt-5 cursor-pointer group flex items-center justify-center gap-4">
      <div className="bg-white rounded-full p-3 group-hover:scale-110 transition-transform duration-300">
        <FolderPlus className="w-8 h-8 text-green-600" />
      </div>
      <p className="text-white text-xl font-semibold group-hover:underline">Create Group</p>
    </div>
  );
}

export default CreateProjectBox;
