import React, { useRef, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import styled, { css } from 'styled-components'; // Import css helper
import Loading from '@/shared/components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from '@/shared/components/Card';
import { Button } from '@/shared/components/Button';
import {
 colorAdditional, colorBlue, colorBorder, colorText, 
} from '@/utils/palette';
import { paddingLeft, left } from '@/utils/directions';
import { 
  fetchUserProfileAction, 
  updateProfileAvatarAction,
} from '@/redux/actions/userActions'; // Adjust path if needed
import { fetchProfileSurveyWidgetDataAction } from '@/redux/actions/surveyActions'; // Adjust path if needed
import { ProfileCard } from '../ProfileBasicComponents';

const DefaultAva = `${process.env.PUBLIC_URL}/img/12.png`;

// Helper function to format numbers with a leading zero (e.g., 5 -> "05")
const formatStatNumber = number => (number < 10 ? `0${String(number)}` : String(number));

const ProfileMain = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null); // Ref for the hidden file input

  const { profile, loading: profileLoading, updating: isUploading } = useSelector(state => state.user);
  const { data: widgetData, loading: widgetLoading } = useSelector(state => state.survey.profileSurveyWidget);

  // Handler to trigger the hidden file input
  const handleAvatarClick = () => {
    // Don't open file dialog if an upload is already in progress
    if (!isUploading) {
      fileInputRef.current.click();
    }
  };

  // Handler for when a user selects a file
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      // In a real app, you would dispatch a notification here.
      alert('Error: File is too large. The maximum size is 2MB.');
      return; // Stop the function
    }
    
    // If the file is valid, dispatch the upload action
    dispatch(updateProfileAvatarAction(file));
  };


  useEffect(() => {
    if (!profile) {
      dispatch(fetchUserProfileAction());
    }
  }, [dispatch, profile]);

  useEffect(() => {
    dispatch(fetchProfileSurveyWidgetDataAction());
  }, [dispatch]);


  const baseUrl = new URL(process.env.REACT_APP_API_URL).origin;
  const avatarUrl = profile?.user?.avatar ? `${baseUrl}/storage/${profile.user.avatar}` : DefaultAva;

  const hasFullName = profile?.user?.first_name && profile?.user?.last_name;

  
  if (profileLoading || widgetLoading || !profile || !widgetData) {
    return (
      <Col md={12} lg={12} xl={12}>
        <Card>
          <ProfileCard>
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <Loading loading fullScreen={false} minHeight={80} />
            </div>
          </ProfileCard>
        </Card>
      </Col>
    );
  }

  return (
    <Col md={12} lg={12} xl={12}>
      <Card>
        <ProfileCard>
          <ProfileInformation>
            {/* The interactive avatar element */}
            <ProfileAvatar onClick={handleAvatarClick} isUploading={isUploading}>
              {isUploading ? (
                <Loading loading fullScreen={false} minHeight={0} />
              ) : (
                <img src={avatarUrl} alt="avatar" />
              )}
              {!isUploading && (
                <UploadOverlay>
                  <p>Change</p>
                </UploadOverlay>
              )}
            </ProfileAvatar>

            {/* Hidden file input, controlled by the ref */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
              accept="image/png, image/jpeg, image/jpg"
            />            
          
            <ProfileData>
              {profileLoading ? (
                <Loading loading fullScreen={false} minHeight={0} />
              ) : (
                <>
                  <ProfileUserName>
                    {/* If full name exists, show it. Otherwise, show username. */}
                    {hasFullName ? `${profile.user.first_name} ${profile.user.last_name}` : profile?.user?.username}
                  </ProfileUserName>
                  
                  {/* If full name exists, also show the username underneath as a handle */}
                  {hasFullName && <ProfileHandle>@{profile?.user?.username}</ProfileHandle>}

                  <ProfileContact href={`mailto:${profile?.user?.email}`}>
                    {profile?.user?.email}
                  </ProfileContact>
                </>
              )}
            </ProfileData>
          </ProfileInformation>
          <ProfileStats>
            <ProfileStat>
              <ProfileStatNumber>
                {widgetLoading ? <Loading loading fullScreen={false} minHeight={0} /> : formatStatNumber(widgetData.surveys_count)}
              </ProfileStatNumber>
              <ProfileStatTitle>Surveys</ProfileStatTitle>
            </ProfileStat>
            <ProfileStat>
              <ProfileStatNumber>
                {widgetLoading ? <Loading loading fullScreen={false} minHeight={0} /> : formatStatNumber(widgetData.submissions_count)}
              </ProfileStatNumber>
              <ProfileStatTitle>Received Submissions</ProfileStatTitle>
            </ProfileStat>
          </ProfileStats>
        </ProfileCard>
      </Card>
    </Col>
  );
};

export default ProfileMain;

const ProfileInformation = styled.div`
  padding: 30px 40px;
  display: flex;
  text-align: ${left};
  border-bottom: 1px solid ${colorBorder};

  @media (max-width: 1345px) and (min-width: 1200px) {
    padding: 30px 15px;
  }

  @media screen and (max-width: 360px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
  }
`;

const UploadOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
`;

const ProfileAvatar = styled.div`
  position: relative;
  height: 140px;
  width: 140px;
  overflow: hidden;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2; // Fallback color

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  &:hover img {
    transform: scale(1.1);
  }

  &:hover ${UploadOverlay} {
    opacity: 1;
  }

  ${props => props.isUploading && css`
    background-color: #333;
    color: white;
  `}
`;

const ProfileData = styled.div`
  width: calc(100% - 140px);
  ${paddingLeft}: 25px;
  min-width: 0;
  
  @media screen and (max-width: 360px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 0;
  }
`;

const ProfileUserName = styled.p`
  font-weight: 900;
  margin: 0;
  font-size: 16px;
  line-height: 20px;
`;

const ProfileHandle = styled.p`
  margin: 4px 0 8px 0;
  font-size: 14px;
  font-style: italic;
  color: ${colorAdditional};
  line-height: 1.2;
`;

const ProfileContact = styled.a`
  display: block;
  margin-top: 0;
  margin-bottom: 5px;
  line-height: 18px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%; /* CHANGED: from 250px to 100% */
  color: ${colorText}; // Use default text color
  text-decoration: none; // Remove underline

  &:hover {
    text-decoration: underline; // Add underline on hover for better UX
    color: ${colorBlue}; // Change color on hover
  }
`;


const ProfileButton = styled(Button)`
  margin-top: 10px;
  margin-bottom: 0;
  padding: 8px 15px;
`;

const ProfileStats = styled.div`
  display: flex;
  justify-content: space-around; 
`;

const ProfileStat = styled.div`
  text-align: center;
  padding-top: 5px;
  padding-bottom: 15px;
`;

const ProfileStatNumber = styled.p`
  color: ${colorBlue};
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  margin: 0;
`;

const ProfileStatTitle = styled.p`
  margin: 0;
  color: ${colorAdditional};
  font-size: 12px;
  line-height: 14px;
`;

// endregion
