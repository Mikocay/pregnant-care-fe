import React, { useState, useRef, useEffect } from 'react';
import './index.css';
import { Button, notification } from 'antd';
import AddPregnancy from './AddPregnancy';
import { RootState } from '@/redux/store/store';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { fetchGrowthMetricByWeek } from '@/redux/features/fetus/slice';
import { useParams } from 'react-router-dom';

function Pregnancy() {
  const [isDragging, setIsDragging] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasShownNotification, setHasShownNotification] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const growthMetricsByWeek = useAppSelector(
    (state: RootState) => state.fetus.growthMetricsByWeek,
  );

  const loading = useAppSelector((state: RootState) => state.fetus.loading);

  useEffect(() => {
    // Ensure that 'id' is not undefined before dispatching API call
    if (id) {
      dispatch(fetchGrowthMetricByWeek(id));
      setHasShownNotification(false); // Reset notification status when ID changes
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!loading && !hasShownNotification) {
      if (growthMetricsByWeek?.length === 0) {
        notification.info({
          message: 'Please input growth metric for baby',
          placement: 'top',
          duration: 3,
        });
      } else {
        notification.success({
          message: 'Data loaded successfully',
          placement: 'top',
          duration: 3,
        });
      }
      setHasShownNotification(true); // Mark notification as shown
    }
  }, [loading, hasShownNotification, growthMetricsByWeek?.length]);

  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    if ((e.target as HTMLElement).closest('.indiana-card')) {
      setIsDragging(true);
      setActiveIndex(index);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    scrollContainerRef.current.scrollLeft -= e.movementX;
  };

  return (
    <div className="pregnancy-container">
      <h1 className="pregnancy-title">My pregnancy week by week</h1>

      <div
        ref={scrollContainerRef}
        className={`scrollContainerTimeline indiana-scroll-container ${
          isDragging ? 'indiana-scroll-container--dragging' : ''
        }`}
      >
        {[...Array(41)].map((_, index) => (
          <div
            className={`indiana-card ${
              activeIndex === index ? 'active-card' : ''
            } ${
              growthMetricsByWeek?.some((item) => item.week === index + 1)
                ? 'active-card'
                : ''
            }`}
            style={{ display: 'flex' }}
            key={index}
            onMouseDown={(e) => handleMouseDown(e, index)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
          >
            <div className="left-card">
              <div className="week-number">{index + 1}</div>
              <span className="week-text"> weeks pregnant</span>
            </div>
            <div className="right-card">
              <img
                alt="Fertilization illustration"
                src="https://assets.babycenter.com/ims/2023/11/week_2_conception-nov-2023.svg"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="content-box">
        <h2>Week {activeIndex + 1} Details</h2>

        <Button onClick={() => setIsModalOpen(true)} className="content-button">
          Add Pregnancy Details
        </Button>
      </div>
      <div>
        <p>This is the content for week {activeIndex + 1}.</p>
      </div>
      <AddPregnancy
        id={id || ''}
        week={activeIndex + 1}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default Pregnancy;
