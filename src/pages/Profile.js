import React, { useEffect, useState } from 'react'
import { useGetUserDetailsQuery } from '../api/modules/login';
import toast from 'react-hot-toast';
import images from '../images';

const Profile = () => {
  const [isRefech, setIsRefech] = useState(false)
  const { data, refetch } = useGetUserDetailsQuery();
  useEffect(() => {
    refetch()
  }, [isRefech])
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success("referal code copied");
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };
  return (
    <div className="container-fluid px-2 px-md-4">
      <div className="page-header min-height-100 border-radius-xl ">
      </div>
      <div className="card card-body mx-3 mx-md-4 mt-n6">
        <div className="row gx-4 mb-2">
          <div className="col-auto">
            <div className="avatar avatar-xl position-relative">
              <img
                src={images.avatar}
                alt="profile_image"
                className="w-100 border-radius-lg shadow-sm"
              />
            </div>
          </div>
          <div className="col-auto my-auto">
            <div className="h-100">
              <h5 className="mb-1">{data?.name}</h5>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 ">
            <section className="refer-earn">
              <div className="refer-box">
                <h5 className="mb-1">Your Referral Code</h5>
                <p>Share this code with your friends to earn rewards:</p>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                  className="referral-code"
                >
                  <img src="../assets/img/download.png" alt='copy' />
                  <p style={{ marginTop: 10 }}>YOUR-CODE-{data?.referralCode}</p>
                  <button className="btn btn-link" onClick={() => copyToClipboard(`${data?.referralCode}`)}>
                    Copy
                  </button>
                </div>
              </div>
              <div className="earn-box">
                <h5 className="mb-1">How it works</h5>
                <ol>
                  <li>Share your referral code with friends and family.</li>
                  <li>Your friends sign up using your code and get rewards.</li>
                  <li>You also get rewards for every successful referral.</li>
                </ol>
              </div>
            </section>
          </div>
          <div className="row">
            <div className="col-12 col-xl-12">
              <div className="card card-plain h-100">
                <div className="card-header pb-0 p-3">
                  <div className="row">
                    <div className="col-md-8 d-flex align-items-center">
                      <h6 className="mb-0">Profile Information</h6>
                    </div>
                    <div className="col-md-4 text-end">
                      <a href="javascript:;">
                        <i
                          className="fas fa-user-edit text-secondary text-sm"
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title="Edit Profile"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card-body p-3">
                  <p style={{ textAlign: "left" }} className="text-sm">
                    PSC Green: Empowering users to excel in Kerala PSC exams with specialized support and guidance.
                  </p>
                  <li className="list-group-item border-0 ps-0 text-sm">
                    <strong className="text-dark">Join Our Whatsapp group:</strong> &nbsp;
                    <a href="https://chat.whatsapp.com/DeQUkcFJFp87EQgjdrsyqC" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-whatsapp"></i> WhatsApp Group Link
                    </a>
                  </li>
                  <li className="list-group-item border-0 ps-0 text-sm">
                    <strong className="text-dark">Join Our Telegram group:</strong> &nbsp;
                    <a href="https://t.me/+MGOr_N97vJo2Zjg1" target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-telegram"></i> Telegram Group Link
                    </a>
                  </li>
                  <hr className="horizontal gray-light my-4" />
                  <ul style={{ textAlign: "left" }} className="list-group">
                    <li className="list-group-item border-0 ps-0 pt-0 text-sm">
                      <strong className="text-dark">Full Name:</strong> &nbsp;
                      {data?.name}
                    </li>
                    <li className="list-group-item border-0 ps-0 text-sm">
                      <strong className="text-dark">Mobile:</strong> &nbsp; (+91)
                      {data?.phone}
                    </li>
                    <li className="list-group-item border-0 ps-0 text-sm">
                      <strong className="text-dark">Email:</strong> &nbsp;
                      {data?.email}
                    </li>
                    <li className="list-group-item border-0 ps-0 text-sm">
                      <strong className="text-dark">Location:</strong> &nbsp; {data?.district}
                    </li>

                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Profile
