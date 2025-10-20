import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = 'MC Estilo Industrial',
  description = 'Muebles y decoración con estilo industrial. Diseños únicos y personalizados.',
  keywords = 'muebles industriales, diseño industrial, muebles de hierro, decoración industrial',
  ogImage = '/img/logo.png',
  url = window.location.href
}) => {
  const siteName = 'MC Estilo Industrial';
  const fullTitle = title === siteName ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Meta Tags Básicos */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Otros */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Spanish" />
      <meta name="author" content="MC Estilo Industrial" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;
