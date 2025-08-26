

"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteMyComponent, getMyComponent } from "./mycomponent";

const MyComponentClient = () => {
  const { data: session } = useSession();
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("Session from component : ",session);


    useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getMyComponent(session.user.email); // ✅ await result
        setComponents(data);
      } catch (error) {
        console.error("Error fetching components:", error);
      } finally {
        setLoading(false);
      }
    }

    if (session?.user?.email) {
      fetchData(); // ✅ just call it
    }
  }, [session?.user?.email]);


  // Handle delete
  const handleDelete = async (id) => {

    const res = await deleteMyComponent(id)

    if (res.ok) {
      setComponents((prev) => prev.filter((item) => item._id !== id));
    } else {
      alert("Failed to delete component.");
    }
  };

  // Handle update (redirect to edit page)
  const handleUpdate = (id) => {
    window.location.href = `/dashboard/user/updateComponent/${id}`;
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">My Components</h1>

      {components.length === 0 ? (
        <p className="text-gray-500">No components found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {components.map((component) => (
            <div
              key={component._id}
              className="bg-white shadow-lg rounded-xl p-5 border border-gray-200 hover:shadow-xl transition"
            >
              <h2 className="text-lg font-semibold mb-2">{component.name}</h2>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {component.description}
              </p>

              <div className="flex justify-between">
                <button
                  onClick={() => handleUpdate(component._id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(component._id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyComponentClient;


