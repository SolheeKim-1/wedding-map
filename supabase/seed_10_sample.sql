-- ---------------------------------------------------------------------------
-- WEDDING MAP - 10 sample wedding halls for the (now-empty) live database.
-- Every name is prefixed "(샘플)" and tagged '샘플' so visitors can tell
-- these are demo listings, not real venues. Run once in Supabase Dashboard
-- -> SQL Editor. Safe to re-run: it clears any previous demo rows first
-- (only rows whose name starts with "(샘플)") so it never duplicates.
-- ---------------------------------------------------------------------------

delete from public.wedding_halls where name like '(샘플)%';

insert into public.wedding_halls
  (name, region, district, address, detail_address, latitude, longitude,
   main_image, images, homepage, phone, open_until, tags,
   minimum_guests, sunday_evening_guests, rental_fee, meal_price,
   negotiable, negotiable_memo, ceremony_type, hall_count,
   parking_capacity, parking_info, subway_info, shuttle_info,
   description, memo, rating, review_count)
values
  ('(샘플) 그랜드컨벤션', 'seoul', '강남구', '서울특별시 강남구 테헤란로 152', '3층 그랜드홀',
   37.5172, 127.0473,
   'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
   array['https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80','https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80'],
   null, '02-1234-5001', '21:00', array['샘플','분리예식','강남'],
   200, 150, 8000000, 75000,
   true, '시즌에 따라 협의 가능', '분리예식', 3,
   80, '지하 주차장 80대 (무료 2시간)', '2호선 강남역 3번 출구 도보 5분', '없음',
   '샘플 데이터입니다. 실제 예식장 정보가 아닙니다.', null, 4.6, 12),

  ('(샘플) 라움가든', 'seoul', '마포구', '서울특별시 마포구 월드컵북로 400', '5층 가든홀',
   37.5663, 126.9019,
   'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
   array['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80'],
   null, '02-1234-5002', '22:00', array['샘플','동시예식','마포'],
   150, 120, 5500000, 68000,
   false, null, '동시예식', 2,
   60, '자체 주차장 60대', '6호선 상암역 도보 10분', '홍대입구역 셔틀 운행',
   '샘플 데이터입니다. 실제 예식장 정보가 아닙니다.', null, 4.4, 8),

  ('(샘플) 더테일러웨딩', 'seoul', '송파구', '서울특별시 송파구 올림픽로 300', '2층',
   37.5145, 127.1058,
   'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
   array['https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80'],
   null, '02-1234-5003', '21:30', array['샘플','분리예식','송파'],
   180, 130, 7000000, 72000,
   true, '식대 별도 협의', '분리예식', 2,
   100, '지상+지하 100대', '2호선/8호선 잠실역 도보 8분', '없음',
   '샘플 데이터입니다. 실제 예식장 정보가 아닙니다.', null, 4.5, 15),

  ('(샘플) 스카이라인컨벤션', 'seoul', '용산구', '서울특별시 용산구 한강대로 100', '10층',
   37.5326, 126.9903,
   'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80',
   array['https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80'],
   null, '02-1234-5004', '20:30', array['샘플','동시예식','용산','한강뷰'],
   250, 200, 9500000, 85000,
   false, null, '동시예식', 1,
   50, '건물 내 공영주차장 이용 (할인)', '1호선/4호선 용산역 도보 3분', '없음',
   '샘플 데이터입니다. 실제 예식장 정보가 아닙니다.', null, 4.8, 21),

  ('(샘플) 올리브가든웨딩', 'gyeonggi', '성남시', '경기도 성남시 분당구 판교역로 231', '4층',
   37.4201, 127.1262,
   'https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=800&q=80',
   array['https://images.unsplash.com/photo-1550005809-91ad75fb315f?w=800&q=80'],
   null, '031-1234-5005', '21:00', array['샘플','분리예식','판교'],
   160, 120, 5000000, 62000,
   true, null, '분리예식', 2,
   120, '자체 주차장 120대 (무료)', '신분당선 판교역 도보 7분', '강남역 셔틀 운행',
   '샘플 데이터입니다. 실제 예식장 정보가 아닙니다.', null, 4.3, 6),

  ('(샘플) 더포레스트웨딩', 'gyeonggi', '수원시', '경기도 수원시 영통구 광교로 145', '지상 1층',
   37.2636, 127.0286,
   'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
   array['https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80'],
   null, '031-1234-5006', '21:00', array['샘플','동시예식','광교','정원'],
   140, 100, 4500000, 58000,
   true, '비수기 할인 가능', '동시예식', 1,
   90, '야외 정원식 주차장 90대', '신분당선 광교중앙역 도보 12분', '없음',
   '샘플 데이터입니다. 실제 예식장 정보가 아닙니다.', null, 4.5, 9),

  ('(샘플) 라비앙로즈', 'gyeonggi', '고양시', '경기도 고양시 일산동구 중앙로 1275', '6층',
   37.6584, 126.8320,
   'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
   array['https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80'],
   null, '031-1234-5007', '22:00', array['샘플','분리예식','일산'],
   170, 130, 4800000, 60000,
   false, null, '분리예식', 2,
   150, '대형 주차장 150대 (무료)', '3호선 정발산역 도보 5분', '없음',
   '샘플 데이터입니다. 실제 예식장 정보가 아닙니다.', null, 4.2, 5),

  ('(샘플) 더화이트베일웨딩홀', 'incheon', '남동구', '인천광역시 남동구 인주대로 780', '3층',
   37.4467, 126.7314,
   'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80',
   array['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80'],
   null, '032-1234-5008', '21:00', array['샘플','분리예식','인천'],
   150, 110, 5000000, 65000,
   true, null, '분리예식', 2,
   100, '자체 주차장 100대', '인천1호선 인천시청역 도보 10분', '없음',
   '샘플 데이터입니다. 실제 예식장 정보가 아닙니다.', null, 4.9, 18),

  ('(샘플) 더뮤즈웨딩홀', 'incheon', '연수구', '인천광역시 연수구 컨벤시아대로 165', '2층',
   37.4100, 126.6784,
   'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
   array['https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80'],
   null, '032-1234-5009', '21:30', array['샘플','동시예식','송도'],
   130, 100, 4200000, 55000,
   false, null, '동시예식', 1,
   70, '컨벤시아 공영주차장 연계', '인천1호선 센트럴파크역 도보 6분', '없음',
   '샘플 데이터입니다. 실제 예식장 정보가 아닙니다.', null, 4.1, 4),

  ('(샘플) 더클래식가든', 'seoul', '종로구', '서울특별시 종로구 종로 105', '5층',
   37.5735, 126.9788,
   'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80',
   array['https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80'],
   null, '02-1234-5010', '20:00', array['샘플','분리예식','종로','전통'],
   200, 160, 8500000, 78000,
   true, '단체 할인 협의 가능', '분리예식', 2,
   40, '건물 지하주차장 40대 (제휴 할인)', '1호선/3호선/5호선 종로3가역 도보 4분', '없음',
   '샘플 데이터입니다. 실제 예식장 정보가 아닙니다.', null, 4.7, 10);
