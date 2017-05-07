import React from 'react';
import VideoListItem from './videoListItem';

const VideoList = (props) =>{
    const items = props.videos.map((video) => {
        return <VideoListItem video={video}/>
    });
    return (
        <ul className="col-md-4 list-group">
            {items}
        </ul>
    );

};

export default VideoList;