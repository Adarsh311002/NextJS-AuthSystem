export default function UserProfilePage({params}: any){

    return (
        <div className="flex flex-col justify-center items-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">profile page </p>
            <span className="bg-red-500 text-3xl" >{params.id}</span>
        </div>
    )
}