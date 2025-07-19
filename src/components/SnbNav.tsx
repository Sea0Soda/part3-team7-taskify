'use client';
import { useEffect, useState } from 'react';
import { mockDashboardData, Dashboard } from '@/api/mockDashboards';

import Image from 'next/image';

const SnbNav = () => {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [prevCursor, setPrevCursor] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  useEffect(() => {
    // 바로 mock 데이터 세팅 추후 api연결
    setDashboards(mockDashboardData.dashboards);
  }, []);
  // 이전 버튼의 이미지 src 결정 (이전 커서가 없으면 비활성화 이미지)
  const prevButtonSrc =
    prevCursor === null ? '/icons/icon_disabledArrow.svg' : '/icons/icon_arrow.svg';

  // 다음 버튼의 이미지 src 결정 (다음 커서가 없으면 비활성화 이미지)
  const nextButtonSrc =
    nextCursor === null ? '/icons/icon_disabledArrow.svg' : '/icons/icon_arrow.svg';
  const handleNewDashboardAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('대시보드를 추가하는 모달이 띄워져야함');
  };
  return (
    <section>
      <nav className='bg-white xs:w-[160px] md:w-[300px] xs:items-start xs:px-[13px] xs:h-full flex flex-col gap-[17px] items-center w-[68px] px-[12px] py-[20px] h-screen border-r-1 border-[#D9D9D9]'>
        <h1>
          <Image
            src='/icons/icon_snbTaskifyMOLogo.svg' // 모바일용 로고 이미지 경로
            alt='Taskify Mobile Logo'
            width={41}
            height={28}
            priority
            className='xs:hidden' // 375px 이상에서는 숨김
          />
          <Image
            src='/icons/icon_snbTaskifyLogo.svg' // 데스크탑용 로고 이미지 경로
            alt='Taskify Desktop Logo'
            width={108.8} // 필요에 따라 데스크탑 로고의 너비/높이 조정
            height={33.07}
            priority
            className='hidden xs:block' // 375px 미만에서는 숨김, 375px 이상에서는 보임
          />
        </h1>
        <div className='flex justify-center items-center w-full xs:justify-between'>
          <h5 className='hidden xs:block text-xs text-[#787486] font-semibold'>Dash Boards</h5>
          <button className='cursor-pointer' onClick={handleNewDashboardAdd}>
            <Image
              src='/icons/icon_dashboardAdd.svg'
              alt='Add Dashboard'
              aria-label='새로운 대시보드 추가'
              width={24}
              height={24}
              className='w-[24px] h-[24px] xs:hidden'
            />
            <Image
              src='/icons/icon_dashboardAdd.svg'
              alt='Add Dashboard'
              aria-label='새로운 대시보드 추가'
              width={20}
              height={20}
              className='hidden xs:block xs:w-[20px] xs:h-[20px]'
            />
          </button>
        </div>

        <ul className='flex flex-col gap-[14px] xs:gap-[4px] w-full'>
          {dashboards.map((item) => (
            <li
              key={item.id}
              className='hover:bg-[#F1EFFD] p-[16px] text-[#787486] font-medium cursor-pointer xs:pl-[10px] xs:py-[8.5px] rounded-sm'
            >
              <div className='flex justify-center items-center gap-[14px] xs:justify-start'>
                <span
                  className='w-[8px] h-[8px] rounded-full block rounded-sm'
                  style={{ backgroundColor: item.color }}
                ></span>

                <div className='hidden xs:flex items-center gap-[4px]'>
                  <span className='w-full xs:w-[75px] overflow-hidden text-ellipsis whitespace-nowrap md:w-full'>
                    {item.title}
                  </span>
                  {item.createdByMe && (
                    <span>
                      <Image
                        src='/icons/icon_crown.svg'
                        alt='왕관 아이콘'
                        width={15.08}
                        height={12}
                      />
                    </span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className='hidden xs:flex mt-[11px]'>
          <button
            disabled={prevCursor === null}
            className='p-[11px] border border-[#D9D9D9] rounded-l-sm cursor-pointer'
          >
            <Image
              className='rotate-180'
              src={prevButtonSrc}
              alt='이전대시보드'
              width={16}
              height={16}
            />
          </button>
          <button
            disabled={nextCursor === null}
            className='p-[11px] border border-[#D9D9D9] rounded-r-sm cursor-pointer'
          >
            <Image src={nextButtonSrc} alt='다음대시보드' width={16} height={16} />
          </button>
        </div>
      </nav>
    </section>
  );
};

export default SnbNav;
