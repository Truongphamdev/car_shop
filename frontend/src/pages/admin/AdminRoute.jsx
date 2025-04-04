import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("dữ liệu từ token",user);

    if (!user) {
        return <Navigate to="/login" replace />; // Nếu chưa đăng nhập, chuyển về login
    }

    if (user.is_admin !== 1) {
        return <Navigate to="/home" replace />; // Nếu không phải admin, chuyển về home
    }

    return <Outlet />; // Nếu là admin, hiển thị nội dung trang
};

export default AdminRoute;
