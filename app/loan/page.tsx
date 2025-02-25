"use client";

export default function LoanPage() {
  return (
    <div style={{ 
      width: "100vw", 
      height: "100vh", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center",
      overflow: "hidden"
    }}>
      <iframe
        src="https://prod.lendingpad.com/got-mortgage-solutions-investments-inc/pos#/?loid=71d6f637-4e06-4c0a-9203-fde777a38638"
        style={{
          width: "100%",
          height: "100%",
          //maxWidth: "1440px",  // Limits width for better centering
          //maxHeight: "900px",   // Ensures it's not too tall
          border: "none",
        }}
      />
    </div>
  );
}

  

  
