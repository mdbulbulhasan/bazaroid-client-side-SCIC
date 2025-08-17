import React from 'react';
import Banner from '../Banner/Banner';
import BeAMerchant from '../BeAMerchant/BeAMerchant';
import Advertisement from '../Advertisement/Advertisement';
import WhyChooseUs from '../WhyChooseUs/WhyChooseUs';
import ProductSection from '../Products/ProductSection/ProductSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <ProductSection></ProductSection>
            <BeAMerchant></BeAMerchant>
            <Advertisement></Advertisement>          
            <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;