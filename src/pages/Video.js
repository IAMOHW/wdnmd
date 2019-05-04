import { List, Button, Card } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';

const { Meta } = Card;

@connect(({ home }) => ({
  home,
}))
class Home extends Component {
  componentDidMount() {
    this.onLoadMore();
  }

  componentWillReceiveProps(nextProps) {
    const {
      location: {
        query: { category },
      },
    } = this.props;
    if (category !== nextProps.location.query.category) {
      this.onLoadMore();
    }
  }

  onLoadMore() {
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

  handleCardClick = id => {
    router.push(`/detail/${id}`);
  };

  render() {
    const {
      home: { videoList, hasMore },
    } = this.props;

    const loadMore = hasMore ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={this.onLoadMore}>loading more</Button>
      </div>
    ) : null;
    return (
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={videoList}
        loadMore={loadMore}
        renderItem={item => (
          <List.Item>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img style={{ height: '238px' }} alt={item.alt} src={item.src} />}
              onClick={() => this.handleCardClick(item.id)}
            >
              <Meta title={item.title} description={item.description} />
            </Card>
          </List.Item>
        )}
      />
    );
  }
}
export default Home;
