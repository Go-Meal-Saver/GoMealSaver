'use client';
import { useState, useEffect, useRef } from 'react';
import opencage from 'opencage-api-client';
import * as maptilersdk from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import Loading from '@/app/loading';
const MealMap = ({ meal }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [geoCodeError, setGeoCodeError] = useState(false);

  useEffect(() => {
    async function fetchCoordinates() {
      opencage
        .geocode({
          q: `${meal.restaurant.address} ${meal.restaurant.city} ${meal.restaurant.state} ${meal.restaurant.zipcode}`,
          key: process.env.NEXT_PUBLIC_OPENCAGE_API_KEY,
        })
        .then((data) => {
          // console.log(JSON.stringify(data));
          if (data.status.code === 200 && data.results.length > 0) {
            const place = data.results[0];
            // console.log(place.formatted);
            // console.log(place.annotations.timezone.name);
            console.log(place.geometry);
            setLat(place.geometry.lat);
            setLng(place.geometry.lng);
            setLoading(false);
          } else {
            console.log('Status', data.status.message);
            console.log('total_results', data.total_results);
            setLoading(false);
            setGeoCodeError(true);
          }
        })
        .catch((error) => {
          // console.log(JSON.stringify(error));
          console.log('Error', error.message);
          setLoading(false);
          setGeoCodeError(true);
          // other possible response codes:
          // https://opencagedata.com/api#codes
          if (error.status?.code === 402) {
            console.log('hit free trial daily limit');
            console.log('become a customer: https://opencagedata.com/pricing');
          }
        });
    }

    fetchCoordinates();
  }, []);

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once
    if (!loading && lat !== null && lng !== null) {
      maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;
      map.current = new maptilersdk.Map({
        container: mapContainer.current,
        style: maptilersdk.MapStyle.STREETS,
        center: [lng, lat],
        zoom: 14,
      });

      new maptilersdk.Marker({ color: '#FF0000' })
        .setLngLat([lng, lat])
        .addTo(map.current);
    }
  }, [lng, lat, loading]);

  if (loading) return <Loading loading={loading} />;

  if (geoCodeError)
    return <div className="text-xl">No restaurant data found</div>;

  return (
    <div
      ref={mapContainer}
      style={{ height: '500px', width: '100%' }}
      className="map"
    />
  );
};

export default MealMap;
