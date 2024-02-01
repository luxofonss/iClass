import { Button, Col, Divider, Row, Typography } from 'antd'
import classNames from 'classnames/bind'

import top_banner from '@assets/images/top_banner.png'
import ClassBlock from '@components/ClassBlock'
import ExamBlock from '@components/ExamBlock'
import { COURSE_VIEW_MODE } from '@shared/constants'
import { MoreHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'
import styles from './Home.module.scss'

const cx = classNames.bind(styles)

const fakeData = [
  {
    img: 'https://er.educause.edu/-/media/images/blogs/2020/8/er20_3206_706x394_blog.jpg',
    name: 'Lập trình web',
    subject: {
      name: 'Lap trinh'
    },
    level: 'Cơ bản',
    teacher: {
      first_name: 'Nguyen',
      last_name: 'Van Quyen'
    },
    price: '100.000',
    currency: 'vnd'
  },
  {
    img: 'https://er.educause.edu/-/media/images/blogs/2020/8/er20_3206_706x394_blog.jpg',
    name: 'Lập trình web',
    subject: {
      name: 'Lap trinh'
    },
    level: 'Cơ bản',
    teacher: {
      first_name: 'Nguyen',
      last_name: 'Van Quyen'
    },
    price: '100.000',
    currency: 'vnd'
  }
]

const Home: React.FC = () => {
  return (
    <div className={cx('home-wrapper')}>
      {/* BANNER */}
      <section
        className={cx('banner-section', 'container')}
        style={{
          backgroundImage: `url("${top_banner}")`
        }}
      >
        <Row className={cx('container')}>
          <Col span={12} className={cx('heading')}>
            <Typography.Title level={1}>
              Hệ thống dạy và học trực tuyến cá nhân hóa cho giáo viên và học sinh
            </Typography.Title>
            <Typography.Paragraph>
              Learnify cung cấp các bài luyện thi, ôn tập chất lượng cao và đa dạng, phù hợp với tất cả các bạn học
              sinh, sinh viên..
            </Typography.Paragraph>
          </Col>
        </Row>
      </section>

      {/* COURSES  */}
      <section className={cx('section', 'container')}>
        <div className={cx('heading')}>
          <Typography.Title level={2}>Khóa học nổi bật</Typography.Title>
          <Typography.Paragraph>
            Với hệ thống khóa học chất lượng cao, nội dung đa dạng và chú trọng thực hành, trải nghiệm học tập của bạn
            tại Learnify sẽ thật sự tuyệt vời và hiệu quả.
          </Typography.Paragraph>
        </div>
        <Row gutter={[16, 16]}>
          {fakeData?.map((item, index) => (
            <Col key={index} span={6}>
              <ClassBlock mode={COURSE_VIEW_MODE.NOT_ENROLLED} data={item} />
            </Col>
          ))}
        </Row>
        <div className={cx('course-footer')}>
          <Link to='/courses'>
            <Button icon={<MoreHorizontal size={14} />}>See more</Button>
          </Link>
        </div>
      </section>

      <Divider />

      {/* ASSIGNMENTS  */}
      <section className={cx('section', 'container')}>
        <div className={cx('heading')}>
          <Typography.Title level={2}>Thư viện đề thi</Typography.Title>
          <Typography.Paragraph>
            Sứ mệnh của Learnify là giúp cho các bạn học sinh, sinh viên có thể học và thi hiệu quả hơn dựa vào hệ thống
            phân tích cá nhân hóa chuyên sâu ứng dụng AI và Big Data.
          </Typography.Paragraph>
        </div>
        <Row gutter={[24, 24]}>
          {[1, 2, 3, 4, 5].map((item) => {
            return (
              <Col span={12} key={item}>
                <ExamBlock />
              </Col>
            )
          })}
        </Row>
      </section>
    </div>
  )
}

export default Home
