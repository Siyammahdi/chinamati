export default function ChallengeBanner() {
  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] sm:rounded-[28px]">
          <img
            src="/leather.png"
            alt="Challenge"
            className="h-[420px] sm:h-[520px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80" />

          <div className="absolute inset-0 flex items-end py-12">
            <div className="px-6 sm:px-10 lg:px-14 max-w-2xl">
              <h3 className="text-[28px] sm:text-[42px] leading-tight font-extrabold tracking-tight text-white">
                Finally, you want to make you
                <br />
                look stylish
              </h3>
              <p className="mt-4 text-[13px] sm:text-sm text-white/90">
                Ready for a challenge? Prepare yourself for exciting tips & challenges and close
                in on your drinking goal, sip by sip.
              </p>
              <button className="mt-6 inline-flex h-11 items-center rounded-full bg-white px-6 text-[13px] sm:text-sm font-semibold text-neutral-900 hover:bg-neutral-100">
                START CHALLENGE
              </button>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-[12px] sm:text-[13px] text-neutral-600">
          *Vitamin C, B6, B12, niacin and pantothenic acid contribute to the reduction of
          tiredness and fatigue.
        </p>
      </div>
    </section>
  )
}
