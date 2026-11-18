export function PhoneFrame({ children }) {
  return (
    <div className="h-svh bg-background md:bg-[#e4e2da]">
      <div className="mx-auto flex h-full w-full max-w-[430px] flex-col bg-background md:shadow-[0_0_0_1px_rgba(23,48,38,0.05)]">
        {children}
      </div>
    </div>
  )
}
