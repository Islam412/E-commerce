"use client";

import * as React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { alpha } from "@mui/material/styles";

import AppButton from "@/components/AppButton/AppButton";
import NextLinkComposed from "@/components/NextLinkComposed/NextLinkComposed";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

type SlideItem = {
  id: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  imageSrc: string;
  objectPosition?: string;
};

const slides: SlideItem[] = [
  {
    id: "1",
    title: "Explore",
    subtitle: "Whatever Your Day Holds, There's a Bag for It",
    ctaText: "Shop now",
    ctaHref: "/shop",
    imageSrc: "/images/slider/slide-1.png",
    objectPosition: "center",
  },
  {
    id: "2",
    title: "New Arrivals",
    subtitle: "Carry smart. Travel light.",
    ctaText: "Shop now",
    ctaHref: "/shop",
    imageSrc: "/images/slider/silder-2.png",
    objectPosition: "center",
  },
];

export default function HeroSlider() {
  const multi = slides.length > 1;

  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        position: "relative",
        overflow: "hidden",
        borderRadius: 0,
        bgcolor: theme.palette.primary.main,

        // ✅ أفضل على كل الشاشات من aspectRatio ثابت
        height: { xs: 340, sm: 430, md: 540, lg: 620 },
        minHeight: 300,

        "& .swiper": { width: "100%", height: "100%" },
        "& .swiper-wrapper": { height: "100%" },

        // ✅ يمنع تراكب المحتوى مع fade
        "& .swiper-slide": { height: "100%", opacity: 0, pointerEvents: "none" },
        "& .swiper-slide-active": { opacity: 1, pointerEvents: "auto" },

        // ✅ Pagination مكانها أفضل على الموبايل
        "& .swiper-pagination": { bottom: { xs: 10, sm: 14 } },
      })}
    >
      <Swiper
        modules={[Autoplay, EffectFade, Pagination, A11y]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={750}
        loop={multi}
        autoplay={
          multi
            ? { delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true }
            : false
        }
        pagination={multi ? { clickable: true } : false}
        style={{ width: "100%", height: "100%" }}
      >
        {slides.map((s, idx) => (
          <SwiperSlide key={s.id}>
            <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
              <Image
                src={s.imageSrc}
                alt={s.title}
                fill
                priority={idx === 0}
                sizes="100vw"
                style={{
                  objectFit: "cover",
                  objectPosition: s.objectPosition ?? "center",
                  display: "block",
                }}
              />

              {/* ✅ Overlay أقوى + Scrim للقراءة */}
              <Box
                sx={(theme) => ({
                  position: "absolute",
                  inset: 0,
                  zIndex: 1,
                  background: `
                    linear-gradient(
                      90deg,
                      ${alpha(theme.palette.primary.main, 0.62)} 0%,
                      ${alpha(theme.palette.primary.main, 0.32)} 42%,
                      ${alpha(theme.palette.primary.main, 0.10)} 70%,
                      ${alpha(theme.palette.primary.main, 0.0)} 100%
                    ),
                    radial-gradient(
                      80% 80% at 70% 45%,
                      ${alpha(theme.palette.secondary.main, 0.08)} 0%,
                      ${alpha(theme.palette.primary.main, 0.12)} 100%
                    )
                  `,
                })}
              />

     {/* ✅ Content (NO glass) */}
<Stack
  spacing={1}
  sx={(theme) => ({
    position: "absolute",
    zIndex: 2,

    left: { xs: 14, sm: 24, md: 44 },
    right: { xs: 14, sm: "auto" },
    bottom: { xs: "auto", sm: "auto" },
    top: { xs: "50%", sm: "50%" },
    transform: {
      xs: "translateY(-65%)", // 👈 بيرفع الكلام لفوق على الموبايل
      sm: "translateY(-50%)",
    },
    

    maxWidth: { xs: 320, sm: "72%", md: "54%" },
    width: { xs: "100%", sm: "auto" },

    // ✅ مفيش خلفية ولا blur
    background: "transparent",
    backdropFilter: "none",
    p: 0,
    borderRadius: 0,

    color: theme.palette.common.white,
  })}
>
  {/* Badge */}
  <Box
    sx={(theme) => ({
      width: "fit-content",
      px: 1.1,
      py: 0.5,
      borderRadius: 999,
      border: `1px solid ${alpha(theme.palette.common.white, 0.22)}`,
      backgroundColor: alpha(theme.palette.common.white, 0.12),
      backdropFilter: "blur(8px)", // ده للبادج فقط (لو عايزه يتشال كمان قولّي)
    })}
  >
    <Typography sx={{ fontWeight: 950, fontSize: { xs: 12, sm: 13 } }}>
      {s.title}
    </Typography>
  </Box>

  {s.subtitle && (
    <Typography
      sx={(theme) => ({
        fontWeight: 950,
        fontSize: { xs: 20, sm: 34, md: 44 },
        lineHeight: 1.08,
        textShadow: `0 12px 26px ${alpha(theme.palette.primary.main, 0.55)}`,
      })}
    >
      {s.subtitle}
    </Typography>
  )}

  {s.ctaText && s.ctaHref && (
    <Box sx={{ pt: 0.5 }}>
  <AppButton
  variant="contained"
  component={NextLinkComposed}
  href={s.ctaHref}
  sx={(theme) => ({
    // 👇 يصغر على الموبايل
    height: { xs: 36, sm: 44 },
    px: { xs: 2, sm: 2.6 },
    fontSize: { xs: 13, sm: 14 },
    fontWeight: 900,
    borderRadius: 999,

    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,

    "&:hover": {
      backgroundColor: alpha(theme.palette.secondary.main, 0.92),
      transform: { sm: "translateY(-1px)" }, // 👈 hover بس على الشاشات الكبيرة
    },

    transition: "transform 180ms ease, background-color 180ms ease",
  })}
>
  {s.ctaText}
</AppButton>

    </Box>
  )}
</Stack>



              {/* ✅ Bottom fade بسيط يخلي الصورة “أفخم” */}
              <Box
                sx={(theme) => ({
                  position: "absolute",
                  inset: 0,
                  zIndex: 1,
                  pointerEvents: "none",
                  background: `linear-gradient(
                    180deg,
                    ${alpha(theme.palette.common.black, 0.0)} 55%,
                    ${alpha(theme.palette.common.black, 0.18)} 100%
                  )`,
                })}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ✅ Pagination from theme */}
      <Box
        sx={(theme) => ({
          "& .swiper-pagination-bullet": {
            opacity: 1,
            width: 8,
            height: 8,
            margin: "0 5px !important",
            backgroundColor: alpha(theme.palette.common.white, 0.5),
            transform: "scale(0.95)",
            transition: "transform 180ms ease, background-color 180ms ease",
          },
          "& .swiper-pagination-bullet-active": {
            backgroundColor: theme.palette.secondary.main,
            transform: "scale(1.15)",
          },
        })}
      />
    </Box>
  );
}
