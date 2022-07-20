import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  ActivitiesData,
  Activity,
  CityInfo,
  GetActivitiesResponse,
  GetCityInfoResponse,
  GetHotelsResponse,
  Hotel,
} from '../models/city';

const headers = new HttpHeaders();
headers
  .append('content-type', 'application/json')
  .append('Access-Control-Allow-Origin', '*')
  .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');

@Injectable({
  providedIn: 'root',
})
export class CityService {
  url = `${environment.apiUrl}/api/v1/cities`;
  constructor(private http: HttpClient) {}

  getCityInfo(cityId: string): Observable<CityInfo> {
    return this.http
      .get<GetCityInfoResponse>(`${this.url}/${cityId}`, { headers: headers })
      .pipe(
        map((res) => {
          let cityInfo: CityInfo = {
            name: `${res.results.firstName} ${res.results.lastName}`,
            cover: res.results.images[0],
            timeZone: '22:13',
            country: {
              name: res.results.country.name,
              emergencyNumbers: res.results.country.emergencyNumbers,
            },
            images: res.results.images,
            population: res.results.population,
            temperature: 30, // TODO: make it dynamic
          };

          return cityInfo;
        })
      );
  }

  getActivities(cityId: string): Observable<Activity[]> {
    return this.http
      .get<GetActivitiesResponse>(`${this.url}/${cityId}/activities`, {
        headers: headers,
      })
      .pipe(
        map((res) => {
          let transformedActivities: Activity[] = [];
          const activities = res.results.data;

          activities.forEach((act) => {
            const activity: Activity = {
              name: act.name,
              bookingLink: act.bookingLink,
              geoCode: act.geoCode,
              picture: act.pictures[0],
              rating: act.rating,
              shortDescription: act.shortDescription,
              price: act.price.amount,
            };
            transformedActivities.push(activity);
          });

          return transformedActivities;
        })
      );
  }

  getHotels(
    cityId: string,
    paramsList: { key: string; value: string }[]
  ): Observable<Hotel[]> {
    let url = `${this.url}/${cityId}/hotels?`;
    paramsList.forEach((param) => {
      url += `${param.key}=${param.value}&`;
    });
    url = url.slice(0, url.length - 1);

    return this.http
      .get<GetHotelsResponse>(url, {
        headers: headers,
      })
      .pipe(
        map((res) => {
          const hotels: Hotel[] = [];

          for (let hotel of res.results.data) {
            hotels.push({
              name: hotel.hotel_name,
              address: hotel.address,
              bookingLink: hotel.url,
              image: hotel.max_1440_photo_url,
              numberOfReviews: hotel.review_nr,
              price: hotel.min_total_price,
              reviewScore: hotel.review_score,
              reviewScoreWord: hotel.review_score_word,
            });
          }

          return hotels;
        })
      );
  }

  findHotels() {
    const data = {
      success: true,
      results: {
        data: [
          {
            url: 'https://www.booking.com/hotel/us/soho-54-hotel.ar.html?aid=304142&label=gen173nr-1DCAEoggI46AdIM1gEaEOIAQGYAQG4ARnIAQ_YAQPoAQGIAgGoAgO4Ap-j4ZYGwAIB0gIkMzg5ZTJmYTktNGExZi00NGZiLWEzZGUtNWQ1NDYxYTNiMTcz2AIE4AIB&sid=39da5728e134f1983568c9412f40452b&age=4&all_sr_blocks=18778126_138747805_2_0_0&checkin=2022-07-21&checkout=2022-07-24&dest_id=20088325&dest_type=city&dist=0&group_adults=2&group_children=1&hapos=1&highlighted_blocks=18778126_138747805_2_0_0&hpos=1&matching_block_id=18778126_138747805_2_0_0&no_rooms=1&req_adults=2&req_age=4&req_children=1&sb_price_type=total&sr_order=popularity&sr_pri_blocks=18778126_138747805_2_0_0__72700&srepoch=1658343976&srpvid=f5ed86532d4e0067&type=total&ucfs=1&#hotelTmpl',
            hotel_name: 'SoHo 54',
            checkin: {
              from: '00:00',
              until: '00:00',
            },
            checkout: {
              from: '00:00',
              until: '00:00',
            },
            hotel_id: 8150100,
            review_score: 7.2,
            review_score_word: 'Good',
            review_nr: 2081,
            address:
              ' 54 Watts Street, SoHo, New York, NY 10013, United States of America',
            main_photo_url:
              'https://cf.bstatic.com/xdata/images/hotel/max1024x768/164957631.jpg?k=f847d43341020e39e2c14f61cc4b245b0ed56205e49bd4289dadf5ccc5770427&o=&hp=1',
            price: 345.34,
          },
          {
            url: 'https://www.booking.com/hotel/us/hyatt-place-new-york-chelsea.html?aid=304142&label=gen173nr-1DCAEoggI46AdIM1gEaEOIAQGYAQG4ARnIAQ_YAQPoAQGIAgGoAgO4Ap-j4ZYGwAIB0gIkMzg5ZTJmYTktNGExZi00NGZiLWEzZGUtNWQ1NDYxYTNiMTcz2AIE4AIB&sid=39da5728e134f1983568c9412f40452b&age=4;all_sr_blocks=693971401_308111836_2_1_0;checkin=2022-07-21;checkout=2022-07-24;dest_id=20088325;dest_type=city;dist=0;group_adults=2;group_children=1;hapos=2;highlighted_blocks=693971401_308111836_2_1_0;hpos=2;matching_block_id=693971401_308111836_2_1_0;no_rooms=1;req_adults=2;req_age=4;req_children=1;room1=A%2CA%2C4;sb_price_type=total;sr_order=popularity;sr_pri_blocks=693971401_308111836_2_1_0__68985;srepoch=1658343976;srpvid=f5ed86532d4e0067;type=total;ucfs=1&#hotelTmpl',
            hotel_name: 'Hyatt Place NYC Chelsea',
            checkin: {
              from: '00:00',
              until: '00:00',
            },
            checkout: {
              from: '00:00',
              until: '00:00',
            },
            hotel_id: 8150100,
            review_score: 7.9,
            review_score_word: 'Good',
            review_nr: 2067,
            address:
              ' 140 West 24th Street, Chelsea, New York, 10011, United States of America',
            main_photo_url:
              'https://cf.bstatic.com/xdata/images/hotel/max1024x768/349913490.jpg?k=4d99b1650e8fbca8edcf82ad819e592a1c868d45a882a70060a140c52e44deaa&o=&hp=1',
            price: 346.34,
          },
          {
            url: 'Park Lane New York',
            hotel_name: 'Park Lane New York',
            checkin: {
              from: '00:00',
              until: '00:00',
            },
            checkout: {
              from: '00:00',
              until: '00:00',
            },
            hotel_id: 8150100,
            review_score: 8.2,
            review_score_word: 'Very Good',
            review_nr: 568,
            address:
              ' 36 Central Park South, New York, NY 10019, United States of America',
            main_photo_url:
              'https://cf.bstatic.com/xdata/images/hotel/max1024x768/336418375.jpg?k=47a9d1f136cea4b248de582d3b4d7fbb72f29e5df47121ec420531b0ea71ea25&o=&hp=1',
            price: 123.34,
          },
          {
            url: 'https://www.booking.com/hotel/us/element-times-square.html?aid=304142&label=gen173nr-1DCAEoggI46AdIM1gEaEOIAQGYAQG4ARnIAQ_YAQPoAQGIAgGoAgO4Ap-j4ZYGwAIB0gIkMzg5ZTJmYTktNGExZi00NGZiLWEzZGUtNWQ1NDYxYTNiMTcz2AIE4AIB&sid=39da5728e134f1983568c9412f40452b&age=4;all_sr_blocks=25731319_263241159_0_1_0;checkin=2022-07-21;checkout=2022-07-24;dest_id=20088325;dest_type=city;dist=0;group_adults=2;group_children=1;hapos=4;highlighted_blocks=25731319_263241159_0_1_0;hpos=4;matching_block_id=25731319_263241159_0_1_0;no_rooms=1;req_adults=2;req_age=4;req_children=1;room1=A%2CA%2C4;sb_price_type=total;sr_order=popularity;sr_pri_blocks=25731319_263241159_0_1_0__95200;srepoch=1658345011;srpvid=ca8488595a690715;type=total;ucfs=1&#hotelTmpl',
            hotel_name: ' Element Times Square West ',
            checkin: {
              from: '00:00',
              until: '00:00',
            },
            checkout: {
              from: '00:00',
              until: '00:00',
            },
            hotel_id: 8150100,
            review_score: 7.9,
            review_score_word: 'Good',
            review_nr: 6363,
            address: "311 West 39th Street, Hell's Kitchen, New York, NY 10018",
            main_photo_url:
              'https://cf.bstatic.com/xdata/images/hotel/max1024x768/336418375.jpg?k=47a9d1f136cea4b248de582d3b4d7fbb72f29e5df47121ec420531b0ea71ea25&o=&hp=1',
            price: 530.34,
          },
          {
            url: 'https://www.booking.com/hotel/us/homewood-suites-midtown-manhattan-times-square-south.html?label=gen173nr-1DCAEoggI46AdIM1gEaEOIAQGYAQG4ARnIAQ_YAQPoAQGIAgGoAgO4Ap-j4ZYGwAIB0gIkMzg5ZTJmYTktNGExZi00NGZiLWEzZGUtNWQ1NDYxYTNiMTcz2AIE4AIB&sid=39da5728e134f1983568c9412f40452b&aid=304142&ucfs=1&arphpl=1&checkin=2022-07-21&checkout=2022-07-24&dest_id=20088325&dest_type=city&group_adults=2&req_adults=2&no_rooms=1&group_children=1&req_children=1&age=4&req_age=4&hpos=6&hapos=6&sr_order=popularity&srpvid=ca8488595a690715&srepoch=1658345011&all_sr_blocks=61792716_266277993_2_1_0&highlighted_blocks=61792716_266277993_2_1_0&matching_block_id=61792716_266277993_2_1_0&sr_pri_blocks=61792716_266277993_2_1_0__86172&tpi_r=2&from_sustainable_property_sr=1&from=searchresults#hotelTmpl',
            hotel_name: 'Homewood Suites Midtown Manhattan Times Square South ',
            checkin: {
              from: '00:00',
              until: '00:00',
            },
            checkout: {
              from: '00:00',
              until: '00:00',
            },
            hotel_id: 8150100,
            review_score: 8.3,
            review_score_word: 'Very Good',
            review_nr: 2254,
            address: "312 West 37th Street, Hell's Kitchen, New York, NY 10018",
            main_photo_url:
              'https://cf.bstatic.com/xdata/images/hotel/max1024x768/34434990.jpg?k=36a7b6f9e1f952afd095a45d7a604fb7c4722813a85dadec4e311b8be68511c8&o=&hp=1',
            price: 900,
          },
        ],
      },
    };

    const hotels: Hotel[] = [];

    for (let hotel of data.results.data) {
      hotels.push({
        name: hotel.hotel_name,
        address: hotel.address,
        bookingLink: hotel.url,
        image: hotel.main_photo_url,
        numberOfReviews: hotel.review_nr,
        price: hotel.price,
        reviewScore: hotel.review_score,
        reviewScoreWord: hotel.review_score_word,
      });
    }

    return hotels;
  }
}
