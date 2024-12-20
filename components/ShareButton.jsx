'use client';

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  EmailIcon,
} from 'react-share';

export default function ShareButton({ meal }) {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/meals/${meal._id}`;

  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2">Share This meal</h3>
      <div className="flex gap-3 justify-center pb-5">
        <FacebookShareButton
          url={shareUrl}
          quote={meal.name}
          hashtag={`#${meal.cuisine.replace(/\s/g, '')}forBuy`}
        >
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        <TwitterShareButton
          url={shareUrl}
          title={meal.name}
          hashtags={[`${meal.cuisine.replace(/\s/g, '')}forBuy`]}
        >
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton url={shareUrl} title={meal.name} separator=": ">
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
        <EmailShareButton
          url={shareUrl}
          subject={meal.name}
          body={`Check out this meal I found on ${shareUrl}`}
        >
          <EmailIcon size={40} round={true} />
        </EmailShareButton>
      </div>
    </>
  );
}
