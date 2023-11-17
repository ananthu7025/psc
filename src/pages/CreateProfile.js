import React, { useState } from 'react';
import { useCreateProfileMutation } from '../api/modules/login';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const CreateProfile = () => {
  const keralaDistricts = [
    'Thiruvananthapuram',
    'Kollam',
    'Pathanamthitta',
    'Alappuzha',
    'Kottayam',
    'Idukki',
    'Ernakulam',
    'Thrissur',
    'Palakkad',
    'Malappuram',
    'Kozhikode',
    'Wayanad',
    'Kannur',
    'Kasaragod',
  ];
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('');
  const [referralCode, setReferralCode] = useState('');

  const [createProfile, { isLoading, isError, isSuccess, error }] = useCreateProfileMutation();

  const handleProfileCreation = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('UserId');
    try {
      const profileData = {
        name,
        phone,
        district,
        userId,
        referralCode
      };
      const result = await createProfile(profileData).unwrap();
      toast.success(result.message);
      if (result?.user?.isPaid) {
        navigate('/Profile');
      }
      else {
        navigate('/payment');
      }
    } catch (err) {
      console.error('Error creating profile:', err);
      navigate('/');
      toast.error("Error creating profile")
    }
  };
  return (
    <main className="main-content  mt-0">
      <section>
        <div className="page-header min-vh-100">
          <div className="container">
            <div className="row">
              <div className="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column">
                <div
                  className="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
                  style={{
                    backgroundImage: 'url("../assets/img/create kerala t 0.png")',
                    backgroundSize: "cover"
                  }}
                ></div>
              </div>
              <div className="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5">
                <div className="card card-plain">
                  <div className="card-header">
                    <h4 className="font-weight-bolder">Create profile</h4>
                    <p className="mb-0">Enter your Name and Details</p>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleProfileCreation}>
                      <div className="input-group input-group-outline mb-3">
                        <input
                          placeholder='Enter Your Name'
                          type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                      </div>
                      <div className="input-group input-group-outline mb-3">
                        <input

                          placeholder='Enter Your Phone'
                          type="number" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                      </div>
                      <div className="input-group input-group-outline mb-3">
                      <select
                          className="form-control"
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                        >
                          <option value="" disabled>
                            Select District
                          </option>
                          {keralaDistricts.map((d, index) => (
                            <option key={index} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="input-group input-group-outline mb-3">
                        <input
                          placeholder='Enter Your Referal'

                          type="text" className="form-control" value={referralCode} onChange={(e) => setReferralCode(e.target.value)} />
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-lg bg-gradient-success btn-lg w-100 mt-4 mb-0" disabled={isLoading}>
                          {isLoading ? 'Creating Profile...' : 'Create Profile'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

  )
}

export default CreateProfile
