"use client";

export default function ResetPage() {


    // if(setSuccess){
    //     <div>
    //         <p>Password reset successfully!</p>
    //     </div>
    // }


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form className="flex flex-col items-stretch justify-center bg-white p-8 shadow-md w-96 rounded-lg">
                <input type="email" name="email" placeholder="メールアドレス" className="mb-2 w-full px-3 py-2 border rounded" />
                <div className="w-full mt-5 flex justify-end items-center">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded">
                        リセット
                    </button>
                </div>
                <div className="w-full mt-2 text-right">
                    <a href="/login" className="text-blue-500 hover:underline">ログインページへ</a>
                </div>
            </form>

        </div>
    )

}