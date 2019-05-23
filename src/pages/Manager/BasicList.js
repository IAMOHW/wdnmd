import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Table, Button, Divider, Layout, Modal } from 'antd';
import VideoForm from './VideoForm';

@connect(({ home }) => ({
  home,
}))
class BasicList extends PureComponent {
  state = { visible: false };

  componentDidMount() {
    const {
      dispatch,
      location: {
        query: { category },
      },
      home: { nextOffset },
    } = this.props;
    dispatch({
      type: 'home/fetch',
      payload: {
        category,
        count: 8,
        offset: nextOffset,
      },
    });
  }

  okHandler = () => {
    this.hideModelHandler();
  };

  showModelHandler = e => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  handleDelete(record) {
    const { dispatch } = this.props;
    const { id } = record;
    dispatch({
      type: 'home/deleteVideo',
      payload: id,
      onComplete: response => {
        if (response) dispatch({ type: 'home/fetch' });
      },
    });
  }

  handleModify() {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/delete',
    });
  }

  render() {
    const {
      home: { videoList },
    } = this.props;
    const { visible } = this.state;
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'VideoAuthor',
        dataIndex: 'videoAuthor',
        key: 'videoAuthor',
      },
      {
        title: 'VideoTitle',
        dataIndex: 'videoTitle',
        key: 'videoTitle',
      },
      {
        title: 'VideoContent',
        dataIndex: 'videoContent',
        key: 'videoContent',
        render: videoContent =>
          videoContent.length < 30 ? videoContent : `${videoContent.substr(0, 27)}...`,
      },
      {
        title: 'CreateTime',
        key: 'createTime',
        dataIndex: 'createTime',
        render: createTime => createTime.split('T')[0],
      },

      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button type="primary" onClick={this.handleModify}>
              修改
            </Button>
            <Divider type="vertical" />
            <Button type="danger" onClick={() => this.handleDelete(record)}>
              删除
            </Button>
          </span>
        ),
      },
    ];

    return (
      <Layout>
        <Modal
          title="新建"
          visible={visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
          okButtonProps={{ form: 'video', key: 'submit', htmlType: 'submit' }}
          width="650px"
        >
          <VideoForm />
        </Modal>
        <Button type="primary" onClick={this.showModelHandler}>
          新增
        </Button>
        <Table columns={columns} dataSource={videoList} />
      </Layout>
    );
  }
}

export default BasicList;
