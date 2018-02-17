import React from 'react';
import { View, Text, Image } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';


const AlbumDetail = ({ album }) => {
    const { title, artist, thumbnail_image } = album;
    const {thumbnailContainer, textContainer} = styles;
    return (
        <Card>
            <CardSection>
                <View>
                    <Image style={thumbnailContainer} source={{ uri: thumbnail_image }} />
                </View>
                <View style={textContainer}>
                    <Text>{title}</Text>
                    <Text>{artist}</Text>
                </View>
            </CardSection>
        </Card>
    );
};

const styles = {
    textContainer: {
        justifyContent: 'space-around',
        flexDirection: 'column'
    },
    thumbnailContainer: {
        height: 50,
        width: 50
    }
};

export default AlbumDetail;
