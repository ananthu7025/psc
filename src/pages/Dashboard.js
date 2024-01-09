import React, { useEffect, useState } from 'react'
import { useGetResultQuery } from '../api/modules/quiz.Module';
import { useGetUserDetailsQuery } from '../api/modules/login';
import { useGetReferalQuery } from '../api/modules/admin';
import toast from 'react-hot-toast';
import images from '../images';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [isRefech, setIsRefech] = useState(false)
  const { data: user } = useGetUserDetailsQuery();
  const { data, refetch } = useGetResultQuery(user?._id);
  const { data: referal } = useGetReferalQuery();
  const [quizDetails, setQuizDetails] = useState(null)
  const navigate = useNavigate();

  const viewQuizDetails = async (resultID) => {
    try {
      navigate(`/view-test/${resultID}`);
    } catch (error) {
      console.error('Failed to fetch quiz details:', error);
      toast.error('Failed to fetch quiz details');
    }
  };
  useEffect(() => {

    refetch()
  }, [isRefech, user?._id])

  const currentMonthScores = data
    ? data.filter(
      (result) =>
        new Date(result.createdAt).getMonth() === new Date().getMonth()
    )
    : [];
  const userReferralData = referal?.filter(
    (referral) => referral.referrerEmail === user?.email
  );
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success("referal code copied");

      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast.error("Failed to copy")

      });
  };
  const sortedScores = currentMonthScores
  ? [...currentMonthScores].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  : [];
  return (
    <div className="container-fluid py-4" style={{ minHeight: "90vh" }}>
      <div className='mb-4 mt-3'>
        <h3 style={{ fontSize: "15px", marginLeft: "20px" }}>Hi,<br /> {user?.name} Welcome back to PSC GREEN,</h3>
      </div>
      <div className="row mb-4 mt-4">
        <div className="col-lg-6 col-md-6">
          <div style={{ maxHeight: "500px", overflow: "auto" }} className="card h-100">
            <div className="card-header pb-0">
              <h6>Your Score</h6>
            </div>
            <div className="card-body p-3">
              {sortedScores && sortedScores.length > 0 ? (
                sortedScores?.map((result) => (
                  <div key={result._id} className="timeline timeline-one-side">
                    <div className="timeline-block mb-3">
                      <span className="timeline-step">
                        <i className="material-icons text-success text-gradient">
                          assignment
                        </i>
                      </span>
                      <div className="timeline-content">
                        <h6 className="text-dark text-sm font-weight-bold mb-0">
                          {new Date(result?.createdAt).toLocaleDateString()}
                        </h6>
                        <div className='d-flex'>
                          <p className="text-secondary font-weight-bold text-xs mt-1 mb-0">
                            Score: {result?.score}
                          </p>
                          <button style={{ marginTop: "-12px" }} className="btn btn-link" onClick={() => viewQuizDetails(result._id)}>
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                  <img className='Img-nodata' src={images.empty} alt="Empty" />
                  <p style={{ textAlign: "center" }}>No scores available for this month.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 addmt">
          <div className="card h-100" style={{ maxHeight: "500px", overflow: "auto" }}>
            <div className="card-header pb-0">
              <h6>Your Referal</h6>
            </div>
            <div className="card-body p-3">
              {userReferralData && userReferralData.length > 0 ? (
                userReferralData.map((result) => (
                  <div key={result?._id} className="timeline timeline-one-side">
                    <div className="timeline-block mb-3">
                      <span className="timeline-step">
                        <i className="material-icons text-success text-gradient">
                          person
                        </i>
                      </span>
                      <div className="timeline-content">
                        <h6 className="text-dark text-sm font-weight-bold mb-0">
                          {result?.refereeEmail}

                        </h6>

                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
                  <img className='Img-nodata' src={images.empty} alt="Empty" />
                  <p style={{ textAlign: "center" }}>No Referals to show .</p>
                </div>
              )}
              <div className="refer-box">
                <h5 className="mb-1">Your Referral Code</h5>
                <p>Share this code with your friends to earn rewards:</p>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                  className="referral-code"
                >
                  <img src="../assets/img/download.png" alt='copy' />
                  <p style={{ marginTop: 10 }}>YOUR-CODE-{user?.referralCode}</p>
                  <button className="btn btn-link" onClick={() => copyToClipboard(`${user?.referralCode}`)}>
                    Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Dashboard
