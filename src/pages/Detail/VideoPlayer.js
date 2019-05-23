import React, { Component } from 'react';
import {
  Layout,
  Avatar,
  Row,
  Col,
  Typography,
  Divider,
  List,
  Input,
  Modal,
  Form,
  Button,
} from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import styles from './VideoPlayer.less';

const { Header, Content } = Layout;
const { Title } = Typography;
const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ video }) => ({
  video,
}))
class VideoPlayer extends Component {
  state = { visible: false, commentValue: '' };

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
    // const self = this
    dispatch({
      type: 'video/fetch',
      payload: { id },
      // onComplete: response => {
      // const { videoDetail: { videoAddr } } = response;
      // if (flv.isSupported()) {
      //   const flvPlayer = flv.createPlayer({
      //     type: 'mp4',
      //     videoAddr,
      //   });
      //   flvPlayer.attachMediaElement(self.videoEle.current);
      //   flvPlayer.load();
      // }
      // },
    });
  };

  handleClick = id => {
    router.replace(`/detail/${id}`);
  };

  submit = () => {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    const { commentValue } = this.state;
    dispatch({
      type: 'video/submitComment',
      payload: { VideoId: parseInt(id, 10), Content: commentValue },
      onComplete: response => {
        if (response) this.loadDate(dispatch, id);
        this.reset();
      },
    });
  };

  reset = () => {
    this.setState({ commentValue: '' });
  };

  handleChange = event => {
    this.setState({ commentValue: event.target.value });
  };

  render() {
    const getModalContent = () => {
      return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="视频名称" {...this.formLayout}>
            <Input placeholder="请输入" />)
          </FormItem>
          <FormItem label="视频地址" {...this.formLayout}>
            <Input placeholder="请输入" />)
          </FormItem>
          <FormItem {...this.formLayout} label="视频描述">
            <TextArea rows={4} placeholder="请输入至少五个字符" />
          </FormItem>
        </Form>
      );
    };
    const timeConverter = UNIXTimestamp => {
      const a = new Date(UNIXTimestamp);
      const year = a.getFullYear();
      const month = a.getMonth();
      const date = a.getDate();
      const hour = a.getHours();
      const min = a.getMinutes();
      const sec = a.getSeconds();
      const time = `${year}/${month + 1}/${date} ${hour}:${min}:${sec}`;
      return time;
    };
    const {
      video: { videoDetail, recommend, commentList },
    } = this.props;
    const { visible, commentValue } = this.state;

    return (
      <Layout className={styles.layout}>
        <Header className={styles.header}>
          <Avatar src={videoDetail.videoImg} />
          {videoDetail.videoTitle}
        </Header>
        <Content>
          <video
            controls
            className={styles.video}
            ref={this.videoEle}
            src={videoDetail.videoAddr}
          />
          <Row>
            <Col span={4}>
              <img className={styles.image} src={videoDetail.videoImg} alt="" />
            </Col>
            <Col span={20}>
              <Row className={styles.rightInfo}>
                <Col span={14} className={styles.desc}>
                  <Title>{videoDetail.videoTitle}</Title>
                  {videoDetail.videoContent}
                  <Divider />
                  <List
                    dataSource={commentList}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                          }
                          title={<a href="https://ant.design">{item.reviewer}</a>}
                          description={timeConverter(item.create_Time)}
                        />
                        <div>{item.content}</div>
                      </List.Item>
                    )}
                  />
                  <TextArea rows={4} value={commentValue} onChange={this.handleChange} />
                  <Button type="primary" onClick={this.submit}>
                    提交
                  </Button>
                  <Button type="danger" onClick={this.reset}>
                    重置
                  </Button>
                </Col>
                <Col span={10} className={styles.related}>
                  <Title level={2}>Related Titles</Title>
                  <Divider />
                  <List
                    dataSource={recommend}
                    renderItem={item => (
                      <List.Item>
                        <Row
                          className={styles.relatedItem}
                          onClick={() => this.handleClick(item.id)}
                        >
                          <Col span={8} style={{ height: '100%' }}>
                            <img src={item.videoImg} style={{ height: '100%' }} alt="" />
                          </Col>
                          <Col span={16}>{item.videoTitle}</Col>
                        </Row>
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Content>
        <Modal className={styles.standardListForm} width={640} destroyOnClose visible={visible}>
          {getModalContent()}
        </Modal>
      </Layout>
    );
  }
}
export default VideoPlayer;
