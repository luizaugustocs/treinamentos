import React from 'react';
import { View, Text } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';


const AlbumDetail = (props) => {
    const { album } = props;
    return (
        <Card>
            <CardSection>
                <View>

                </View>
                <View style={styles.textContainer}>
                    <Text>{album.title}</Text>
                    <Text>{album.artist}</Text>
                </View>
            </CardSection>
        </Card>
    );
};

const styles = {
    textContainer: {
        justifyContent: 'space-around',
        flexDirection: 'column'
    }
}

export default AlbumDetail;
