"use client"
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import '@/app/styles/color.css';

export default function UserProfile() {
  const router = useRouter(); 

  const [formData, setFormData] = useState({
    name: '',
     info: '',
     email: '',
     dob: '',
     gender: '',
     notification: false,
     schedule: '',
     job: '',
     address: '',
     experience: '',
     phone: '',
     avatar: ''
  });

  const redirectToHomePage = () => {
    router.push("/trangchu.html"); 
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData); 
    redirectToHomePage(); 
  };
  return (
 <>
 <Head>
 <title>Thông tin y tá</title>
 </Head>
 <div className="top">
        <div className="container">
          <div className="header">
            <div className="menu-left">
              <div className="menu-item"><Link href="/user-management">Trang chủ</Link></div>
              <div className="menu-item"><Link href="http://localhost:3001/">Thông tin bác sĩ</Link></div>
              <div className="menu-item"><Link href="/nurseinfo.tsx">Hồ sơ bệnh nhân</Link></div>
            </div>
            <div className="menu-right">
              <div className="notifications">
                Thông báo
                <div className="notifications-dropdown">
                  <ul>
                    <li><Link href="/info1">Tin tức 1</Link></li>
                    <li><Link href="/info2">Tin tức 2</Link></li>
                    <li><Link href="/info3">Tin tức 3</Link></li>
                  </ul>
                </div>
              </div>
              <button onClick={redirectToHomePage}>Thoát</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{background:'rgb(206, 206, 239)'}} >
        <h1 > Thông tin y tá</h1>
        <form onSubmit={handleSubmit}>  
 <div className="left-form">
   <label htmlFor="name">Họ và Tên:</label>
   <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
   
   <label htmlFor="info">Thông tin y tá:</label>
   <input type="text" id="info" name="info" value={formData.info} onChange={handleChange} required />
   
   <label htmlFor="email">Email:</label>
   <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

   <label htmlFor="dob">Ngày Sinh:</label>
   <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />

   <label htmlFor="gender">Giới Tính:</label>
   <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
     <option value="male">Nam</option>
     <option value="female">Nữ</option>
     <option value="other">Khác</option>
   </select>
   
   <label htmlFor="notification">Notification:</label>
   <input type="checkbox" id="notification" name="notification" checked={formData.notification} onChange={handleChange} required />
   <input type="submit" value="Lưu" style={{ textAlign: 'center' }} />
 </div> 

 <div className="right-form"> 
   <label htmlFor="schedule">Thời gian hoạt động:</label>
   <select id="schedule" name="schedule" value={formData.schedule} onChange={handleChange}>
     <option value="">Chọn thời gian hoạt động</option>
     <option value="Thứ 2 đến thứ 6: sáng 7:00 đến 11:00">Thứ 2 đến thứ 6: sáng 7:00 đến 11:00</option>
     <option value="Thứ 2 đến thứ 6: chiều 13:30 đến 17:00">Thứ 2 đến thứ 6: chiều 13:30 đến 17:00</option>
     <option value="Thứ 7 và chủ nhật: Sáng 9:00 đến 10:30">Thứ 7 và chủ nhật: Sáng 9:00 đến 10:30</option>
     <option value="Thứ 7 và chủ nhật: Chiều 15:00 đến 16:30">Thứ 7 và chủ nhật: Chiều 15:00 đến 16:30</option>
   </select>

   <label htmlFor="job">Chuyên khoa:</label>
   <input type="text" id="job" name="job" value={formData.job} onChange={handleChange} required />
   
   <label htmlFor="experience">Số năm kinh nghiệm:</label>
   <input type="text" id="experience" name="experience" value={formData.experience} onChange={handleChange} required />

   <label htmlFor="phone">Số điện thoại:</label>
   <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
   
   <label htmlFor="address">Địa chỉ:</label>
   <input type="text" id="address" name="address" value={formData.phone} onChange={handleChange} required />

   <label htmlFor="avatar">Hình Ảnh Y Tá:</label>
   <input type="file" id="avatar" name="avatar" accept="image/*" />
 
 </div>

</form>
      </div> 
 </>   
  );
}
