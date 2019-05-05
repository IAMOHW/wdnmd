import React, { Component } from 'react';
import { Layout, Avatar, Row, Col, Typography, Divider, List } from 'antd';
import { connect } from 'dva';
import flv from 'flv.js';
import router from 'umi/router';
import styles from './VideoPlayer.less';

const { Header, Content } = Layout;
const { Title } = Typography;

@connect(({ video }) => ({
  video,
}))
class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.videoEle = React.createRef();
  }

  componentDidMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    this.loadDate(dispatch, id);
  }

  componentWillReceiveProps(nextProps) {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    if (id !== nextProps.match.params.id) {
      this.loadDate(dispatch, id);
    }
  }

  loadDate = (dispatch, id) => {
    dispatch({
      type: 'video/fetch',
      payload: { id },
      onComplete: response => {
        const { url } = response;
        if (flv.isSupported()) {
          const flvPlayer = flv.createPlayer({
            type: 'mp4',
            url,
          });
          flvPlayer.attachMediaElement(this.videoEle.current);
          flvPlayer.load();
        }
      },
    });
  };

  handleClick = id => {
    router.replace(`/detail/${id}`);
  };

  render() {
    const {
      video: { title, avatar, cover, relatedVideo, commentList },
    } = this.props;
    return (
      <Layout className={styles.layout}>
        <Header className={styles.header}>
          <Avatar src={avatar} />
          {title}
        </Header>
        <Content>
          <video controls className={styles.video} ref={this.videoEle}>
            <track kind="captions" />
          </video>
          <Row>
            <Col span={4}>
              <img className={styles.image} src={cover} alt="" />
            </Col>
            <Col span={20}>
              <Row className={styles.rightInfo}>
                <Col span={14} className={styles.desc}>
                  <Title>{title}</Title>
                  <Divider />
                  <List
                    dataSource={commentList}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                          }
                          title={<a href="https://ant.design">{item.name}</a>}
                          description={item.dateTime}
                        />
                        <div>{item.content}</div>
                      </List.Item>
                    )}
                  />
                </Col>
                <Col span={10} className={styles.related}>
                  <Title level={2}>Related Titles</Title>
                  <Divider />
                  <List
                    dataSource={relatedVideo}
                    renderItem={item => (
                      <List.Item>
                        <Row
                          className={styles.relatedItem}
                          onClick={() => this.handleClick(item.id)}
                        >
                          <Col span={6} style={{ height: '100%' }}>
                            <img src={item.cover} style={{ height: '100%' }} alt="" />
                          </Col>
                          <Col span={18}>{item.title}</Col>
                        </Row>
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}
export default VideoPlayer;
