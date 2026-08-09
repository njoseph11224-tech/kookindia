import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable

def build_pdf():
    pdf_filename = r"C:\Nithin-Learning\Projects\kookindia\KookIndia_Investor_and_Developer_Guide.pdf"
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40
    )

    styles = getSampleStyleSheet()

    # Custom Color Palette
    TERRACOTTA = colors.HexColor("#E05326")
    CHARCOAL = colors.HexColor("#1E1B18")
    CREAM = colors.HexColor("#FAF7F2")
    DARK_SLATE = colors.HexColor("#334155")
    EMERALD = colors.HexColor("#047857")

    # Custom Paragraph Styles
    title_style = ParagraphStyle(
        'CoverTitle',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=28,
        leading=34,
        textColor=CHARCOAL,
        alignment=0,
        spaceAfter=10
    )

    subtitle_style = ParagraphStyle(
        'CoverSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=18,
        textColor=TERRACOTTA,
        alignment=0,
        spaceAfter=20
    )

    heading1_style = ParagraphStyle(
        'H1',
        parent=styles['Heading1'],
        fontName='Helvetica-Bold',
        fontSize=18,
        leading=22,
        textColor=TERRACOTTA,
        spaceBefore=15,
        spaceAfter=10
    )

    heading2_style = ParagraphStyle(
        'H2',
        parent=styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=16,
        textColor=CHARCOAL,
        spaceBefore=10,
        spaceAfter=6
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['BodyText'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=DARK_SLATE,
        spaceAfter=8
    )

    bold_body_style = ParagraphStyle(
        'BoldBody',
        parent=body_style,
        fontName='Helvetica-Bold',
        textColor=CHARCOAL
    )

    code_style = ParagraphStyle(
        'CodeSnippet',
        parent=body_style,
        fontName='Courier',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor("#0F172A")
    )

    story = []

    # ================= COVER & HEADER =================
    story.append(Paragraph("KookIndia", title_style))
    story.append(Paragraph("Investor Memorandum, Product Blueprint & Developer Guide", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2.5, color=TERRACOTTA, spaceBefore=0, spaceAfter=15))

    story.append(Paragraph("<b>Author / Lead Engineering:</b> Nithin Joseph & Engineering Team", body_style))
    story.append(Paragraph("<b>Version:</b> 1.0 (Production-Ready Prototype)", body_style))
    story.append(Paragraph("<b>Target Market:</b> India Tier-1 Cities (Bangalore, Gurgaon, Mumbai, Hyderabad, Pune, NCR)", body_style))
    story.append(Paragraph("<b>Repository Path:</b> <code>C:\\Nithin-Learning\\Projects\\kookindia</code>", body_style))
    story.append(Spacer(1, 15))

    # ================= EXECUTIVE SUMMARY =================
    story.append(Paragraph("1. Executive Summary", heading1_style))
    story.append(Paragraph(
        "<b>KookIndia</b> is a full-stack, hyperlocal food marketplace designed to empower India's 300 Million+ homemakers and regional home chefs. "
        "The platform connects urban professionals, students, and families with verified home cooks delivering authentic regional meals, "
        "daily tiffin subscriptions, and party catering.", body_style
    ))
    story.append(Paragraph(
        "Unlike commercial delivery platforms (Zomato / Swiggy), KookIndia operates on a <b>Pre-Order & Prepared Batch</b> model, "
        "allowing home cooks to monetize their culinary skills with 0 upfront cloud-kitchen overhead and lower platform commissions (12-15% vs 25-30%).", body_style
    ))

    # ================= MARKET OPPORTUNITY =================
    story.append(Paragraph("2. Market Size & Opportunity", heading1_style))
    
    market_data = [
        [Paragraph("<b>Segment</b>", bold_body_style), Paragraph("<b>Market Value</b>", bold_body_style), Paragraph("<b>Target Focus</b>", bold_body_style)],
        [Paragraph("TAM (Total Addressable)", body_style), Paragraph("$40 Billion+", body_style), Paragraph("Indian Food Services Market", body_style)],
        [Paragraph("SAM (Serviceable Addressable)", body_style), Paragraph("$6 Billion+", body_style), Paragraph("Home Tiffin & Regional Meals (Top 10 Cities)", body_style)],
        [Paragraph("SOM (Serviceable Obtainable)", body_style), Paragraph("$150 Million GMV", body_style), Paragraph("3-Year Goal across 6 Initial Metros", body_style)],
    ]
    t_market = Table(market_data, colWidths=[160, 120, 250])
    t_market.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), CREAM),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#EFECE6")),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_market)
    story.append(Spacer(1, 15))

    # ================= UNIT ECONOMICS =================
    story.append(Paragraph("3. Unit Economics & Monetization", heading1_style))
    
    econ_data = [
        [Paragraph("<b>Metric</b>", bold_body_style), Paragraph("<b>Value (INR)</b>", bold_body_style), Paragraph("<b>Percentage / Note</b>", bold_body_style)],
        [Paragraph("Average Order Value (AOV)", body_style), Paragraph("<b>₹380.00</b>", body_style), Paragraph("100% (Food + Taxes)", body_style)],
        [Paragraph("Platform Commission (14%)", body_style), Paragraph("₹53.20", body_style), Paragraph("14% of Dish Subtotal", body_style)],
        [Paragraph("Platform Hygiene Fee", body_style), Paragraph("₹15.00", body_style), Paragraph("Fixed Per Order", body_style)],
        [Paragraph("<b>Gross Margin / Order</b>", bold_body_style), Paragraph("<b>₹68.20</b>", bold_body_style), Paragraph("<b>18% Gross Margin</b>", bold_body_style)],
        [Paragraph("Customer Acquisition Cost (CAC)", body_style), Paragraph("₹120.00", body_style), Paragraph("Digital Ads & Referral Bonuses", body_style)],
        [Paragraph("Customer Lifetime Value (LTV)", body_style), Paragraph("₹2,400.00", body_style), Paragraph("Based on 20 Orders/Year", body_style)],
        [Paragraph("<b>LTV : CAC Ratio</b>", bold_body_style), Paragraph("<b>20x</b>", bold_body_style), Paragraph("<b>Best-in-class Unit Economics</b>", bold_body_style)],
    ]
    t_econ = Table(econ_data, colWidths=[180, 120, 230])
    t_econ.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), CREAM),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#EFECE6")),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_econ)
    story.append(Spacer(1, 15))

    # ================= KEY FEATURES & PROTOTYPE SCREENSHOTS =================
    story.append(PageBreak())
    story.append(Paragraph("4. Core Features & Prototype Architecture", heading1_style))

    features = [
        ("1. Customer Marketplace (app/page.tsx)", 
         "Location Selector (Bangalore, Gurgaon, Mumbai, Hyderabad, Pune, NCR), regional cuisine filtering (North Indian, South Indian, Bengali, Gujarati, Jain), and Multi-Chef basket."),
        
        ("2. Multi-Chef Basket (components/CartDrawer.tsx)", 
         "Allows customers to purchase dishes from multiple neighborhood home cooks in a single checkout. Automatically calculates per-kitchen dispatch fees and splits sub-orders."),
        
        ("3. Kitchen Menu Detail (app/kitchen/[id]/page.tsx)", 
         "Showcases Chef Bio, FSSAI verification badge, prep lead times, portions remaining, and portion selectors."),
        
        ("4. Cook Partner Dashboard (app/cook/dashboard/page.tsx)", 
         "Homemaker Control Panel: Kitchen OPEN/CLOSED toggle, Photo Upload file picker with live preview, Advance Pre-Batch setup (Ready Batch vs Made-to-Order), Dish Modifier (Modify Dish modal), and Bulk Order Status Actions (ACCEPTED, COOKING, DISPATCHED, DELIVERED)."),
        
        ("5. Admin Operations Portal (app/admin/page.tsx)", 
         "Platform Management: FSSAI verification queue for pending home kitchens, virtual kitchen photo audits, and Customer Support & Complaints Resolution Center."),
        
        ("6. Live Order Tracking (app/order/[id]/page.tsx)", 
         "4-step live status timeline: Placed ➔ Accepted ➔ Cooking ➔ Dispatched with Dunzo/Porter ➔ Delivered.")
    ]

    for title, desc in features:
        story.append(Paragraph(f"<b>{title}</b>", heading2_style))
        story.append(Paragraph(desc, body_style))
        story.append(Spacer(1, 4))

    story.append(Spacer(1, 10))

    # ================= TECHNICAL DEEP-DIVE =================
    story.append(Paragraph("5. Developer Tech Stack & Data Models", heading1_style))
    
    tech_data = [
        [Paragraph("<b>Component</b>", bold_body_style), Paragraph("<b>Technology Selection</b>", bold_body_style)],
        [Paragraph("Frontend Framework", body_style), Paragraph("Next.js 16.3 (App Router) + React 19 + TypeScript", body_style)],
        [Paragraph("Styling System", body_style), Paragraph("Tailwind CSS v4 + Vanilla CSS Design Tokens", body_style)],
        [Paragraph("Icon Library", body_style), Paragraph("Lucide React", body_style)],
        [Paragraph("Database Layer", body_style), Paragraph("PostgreSQL (Supabase compatible) with In-Memory DB Engine (lib/db.ts)", body_style)],
        [Paragraph("Logistics Partners", body_style), Paragraph("Dunzo / Porter / Borzo / Shadowfax API Integrations", body_style)],
        [Paragraph("Payment Gateway", body_style), Paragraph("Razorpay / PhonePe (UPI, Credit/Debit, COD)", body_style)],
    ]
    t_tech = Table(tech_data, colWidths=[150, 380])
    t_tech.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), CREAM),
        ('GRID', (0,0), (-1,-1), 0.5, colors.HexColor("#EFECE6")),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_tech)
    story.append(Spacer(1, 15))

    # ================= DEVELOPER SETUP INSTRUCTIONS =================
    story.append(Paragraph("6. Developer Setup & Local Execution", heading1_style))
    story.append(Paragraph("Follow these instructions to run the local prototype repository on your machine:", body_style))
    
    commands = [
        "1. Open Terminal or PowerShell.",
        "2. Navigate to project folder:  cd C:\\Nithin-Learning\\Projects\\kookindia",
        "3. Install dependencies:          npm install",
        "4. Start Next.js dev server:     npm run dev",
        "5. Open Browser:                 http://localhost:3000",
        "6. Admin Portal:                 http://localhost:3000/admin/login (admin@kookindia.com / admin123)",
        "7. Cook Partner Dashboard:       http://localhost:3000/cook/dashboard"
    ]

    for cmd in commands:
        story.append(Paragraph(f"<code>{cmd}</code>", code_style))

    story.append(Spacer(1, 20))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor("#CBD5E1"), spaceBefore=10, spaceAfter=15))
    story.append(Paragraph("<b>End of Memorandum — KookIndia Technologies Pvt Ltd</b>", ParagraphStyle('End', parent=body_style, alignment=1)))

    doc.build(story)
    print(f"SUCCESS: Generated PDF at {pdf_filename}")

if __name__ == "__main__":
    build_pdf()
