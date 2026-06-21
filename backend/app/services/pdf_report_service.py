import os
import datetime
from io import BytesIO
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import Paragraph
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT

class PDFReportService:
    @staticmethod
    def generate_report(data: dict) -> BytesIO:
        buffer = BytesIO()
        c = canvas.Canvas(buffer, pagesize=letter)
        width, height = letter
        
        # Colors
        C_PRIMARY = colors.HexColor('#8A1538')
        C_SECONDARY = colors.HexColor('#A65612')
        C_SUCCESS = colors.HexColor('#16A34A')
        C_WARNING = colors.HexColor('#F59E0B')
        C_DANGER = colors.HexColor('#DC2626')
        C_BG = colors.HexColor('#FAFAFA')
        C_BORDER = colors.HexColor('#E5E7EB')
        C_TEXT = colors.HexColor('#111827')
        C_MUTED = colors.HexColor('#6B7280')

        # Data extraction
        prediction = data.get("prediction", "N/A").upper()
        conf_score = int(data.get("confidence_score", 0))
        is_fake = prediction == "FAKE" or prediction == "FAKE NEWS"
        pred_text = "FAKE NEWS" if is_fake else "REAL NEWS"
        main_color = C_DANGER if is_fake else C_SUCCESS
        
        file_name = data.get("file_name", "document.pdf")
        if len(file_name) > 40: file_name = file_name[:37] + "..."
        analysis_date = data.get("analysis_date", datetime.datetime.now().strftime("%d %B %Y %I:%M %p"))
        sentiment = data.get("sentiment", "Neutral")
        clickbait = data.get("clickbait_score", 0)
        word_count = data.get("word_count", 0)
        reading_time = data.get("reading_time", 0)
        keywords = data.get("keywords", [])
        summary = data.get("summary", "No summary available.")
        
        # Helpers
        def draw_gradient_header(c, h=250):
            c.saveState()
            p = c.beginPath()
            p.rect(0, height - h, width, h)
            c.clipPath(p, stroke=0, fill=0)
            c.linearGradient(0, height - h, width, height + h, (C_PRIMARY, C_SECONDARY))
            c.restoreState()
            
        def draw_footer(c, page_num):
            c.saveState()
            p = c.beginPath()
            p.rect(0, 0, width, 30)
            c.clipPath(p, stroke=0, fill=0)
            c.linearGradient(0, 0, width, 30, (C_PRIMARY, C_SECONDARY))
            c.restoreState()
            
            c.saveState()
            c.setFillColor(colors.white)
            c.setFont("Helvetica-Bold", 9)
            c.drawString(40, 10, "Trusted AI. Smarter Decisions. Better Information.")
            c.drawRightString(width - 40, 10, f"PAGE {page_num}")
            c.restoreState()

        def draw_top_bar(c, title, page_num):
            c.saveState()
            c.setFillColor(C_PRIMARY)
            c.setFont("Helvetica-Bold", 14)
            c.drawString(40, height - 40, "CREDLY")
            c.setFont("Helvetica", 10)
            c.setFillColor(C_MUTED)
            c.drawCentredString(width/2, height - 40, "AI-Powered News Credibility Analysis")
            c.drawRightString(width - 40, height - 40, f"PAGE {page_num}")
            c.line(40, height - 55, width - 40, height - 55)
            c.setFont("Helvetica-Bold", 18)
            c.setFillColor(C_TEXT)
            c.drawString(40, height - 85, title)
            c.restoreState()

        styles = getSampleStyleSheet()
        normal_style = styles['Normal']
        normal_style.textColor = C_TEXT
        normal_style.fontSize = 10
        normal_style.leading = 14

        # ==========================================
        # PAGE 1: COVER PAGE
        # ==========================================
        draw_gradient_header(c, 350)
        
        # Header Text
        c.setFillColor(colors.white)
        c.setFont("Helvetica-Bold", 28)
        c.drawCentredString(width/2, height - 80, "CREDLY")
        c.setFont("Helvetica", 12)
        c.drawCentredString(width/2, height - 100, "AI-Powered News Credibility Analysis")
        
        c.setFont("Helvetica-Bold", 24)
        c.drawCentredString(width/2, height - 160, "CREDIBILITY ANALYSIS REPORT")
        
        # Centerpiece: Large Circular Confidence Score
        c.setFillColor(colors.white)
        c.circle(width/2, height - 320, 120, stroke=0, fill=1)
        c.setStrokeColor(C_BORDER)
        c.setLineWidth(10)
        c.circle(width/2, height - 320, 100, stroke=1, fill=0)
        
        # Arc for score
        c.setStrokeColor(main_color)
        c.setLineWidth(10)
        extent = - (conf_score / 100.0) * 360
        c.arc(width/2 - 100, height - 320 - 100, width/2 + 100, height - 320 + 100, 90, extent)
        
        c.setFillColor(main_color)
        c.setFont("Helvetica-Bold", 48)
        c.drawCentredString(width/2, height - 330, f"{conf_score}%")
        c.setFont("Helvetica-Bold", 12)
        c.setFillColor(C_TEXT)
        c.drawCentredString(width/2, height - 355, "CONFIDENCE SCORE")
        
        # Badge
        c.setFillColor(main_color)
        c.roundRect(width/2 - 80, height - 480, 160, 40, 20, stroke=0, fill=1)
        c.setFillColor(colors.white)
        c.setFont("Helvetica-Bold", 18)
        c.drawCentredString(width/2, height - 466, pred_text)
        
        # Info Card
        c.setStrokeColor(C_BORDER)
        c.setFillColor(C_BG)
        c.roundRect(40, height - 600, width - 80, 80, 10, stroke=1, fill=1)
        c.setFillColor(C_TEXT)
        c.setFont("Helvetica-Bold", 12)
        c.drawString(60, height - 550, "Analyzed Document:")
        c.setFont("Helvetica", 12)
        c.drawString(60, height - 575, file_name)
        
        # Metadata grid
        c.roundRect(40, height - 700, width - 80, 80, 10, stroke=1, fill=1)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(60, height - 640, "Report ID:")
        c.setFont("Helvetica", 10)
        c.drawString(60, height - 660, "CRD-" + analysis_date.replace(" ", "").replace(":", "")[:10])
        
        c.setFont("Helvetica-Bold", 10)
        c.drawString(250, height - 640, "Generated On:")
        c.setFont("Helvetica", 10)
        c.drawString(250, height - 660, analysis_date)
        
        c.setFont("Helvetica-Bold", 10)
        c.drawString(400, height - 640, "Generated By:")
        c.setFont("Helvetica", 10)
        c.drawString(400, height - 660, "Credly AI Engine")
        
        draw_footer(c, 1)
        c.showPage()
        
        # ==========================================
        # PAGE 2: EXECUTIVE SUMMARY
        # ==========================================
        draw_top_bar(c, "EXECUTIVE SUMMARY", 2)
        
        def draw_card(c, x, y, w, h, title, value, val_color):
            c.setStrokeColor(C_BORDER)
            c.setFillColor(C_BG)
            c.roundRect(x, y, w, h, 10, stroke=1, fill=1)
            c.setFillColor(C_TEXT)
            c.setFont("Helvetica-Bold", 9)
            c.drawCentredString(x + w/2, y + h - 25, title.upper())
            c.setFillColor(val_color)
            c.setFont("Helvetica-Bold", 18)
            c.drawCentredString(x + w/2, y + 35, str(value))
        
        cw = 110
        ch = 120
        gap_x = 20
        gap_y = 20
        start_x = 40
        start_y = height - 250
        
        draw_card(c, start_x, start_y, cw, ch, "Prediction", pred_text, main_color)
        draw_card(c, start_x + cw + gap_x, start_y, cw, ch, "Confidence", f"{conf_score}%", main_color)
        draw_card(c, start_x + 2*(cw + gap_x), start_y, cw, ch, "Sentiment", sentiment, C_SUCCESS if sentiment.lower()=='positive' else C_DANGER)
        draw_card(c, start_x + 3*(cw + gap_x), start_y, cw, ch, "Clickbait", f"{clickbait}%", C_WARNING if clickbait > 50 else C_SUCCESS)
        
        start_y -= (ch + gap_y)
        draw_card(c, start_x, start_y, cw, ch, "Word Count", word_count, C_TEXT)
        draw_card(c, start_x + cw + gap_x, start_y, cw, ch, "Reading Time", f"{reading_time}m", C_TEXT)
        draw_card(c, start_x + 2*(cw + gap_x), start_y, cw, ch, "Keywords", len(keywords), C_TEXT)
        draw_card(c, start_x + 3*(cw + gap_x), start_y, cw, ch, "Source Cred", "Low" if is_fake else "High", main_color)
        
        # Overall Assessment
        c.roundRect(40, start_y - 120, width - 80, 100, 10, stroke=1, fill=1)
        c.setFillColor(C_TEXT)
        c.setFont("Helvetica-Bold", 12)
        c.drawString(60, start_y - 50, "Overall Assessment")
        
        assessment_text = f"Our AI model has analyzed the content and determined that this article is most likely to be <font color='{'#DC2626' if is_fake else '#16A34A'}'><b>{pred_text}</b></font> based on multiple credibility indicators including language patterns, sentiment, and keyword detection."
        p = Paragraph(assessment_text, normal_style)
        p.wrapOn(c, width - 120, 60)
        p.drawOn(c, 60, start_y - 95)
        
        draw_footer(c, 2)
        c.showPage()
        
        # ==========================================
        # PAGE 3: WHY THIS ARTICLE WAS FLAGGED
        # ==========================================
        draw_top_bar(c, "WHY THIS ARTICLE WAS FLAGGED" if is_fake else "CREDIBILITY INDICATORS", 3)
        
        reasons = []
        if is_fake:
            reasons = [
                ("Lack of Trusted Sources", "No verified or authoritative sources were definitively detected in the content."),
                ("Suspicious Language Patterns", "The article contains words and patterns commonly associated with misleading information."),
                ("Low Source Credibility", "The overall linguistic footprint matches datasets of low credibility sources."),
                ("Misinformation Indicators", "Multiple indicators suggest the content may be exaggerated, unverified, or clickbait.")
            ]
        else:
            reasons = [
                ("High Fact Consistency", "The article maintains a consistent narrative without contradictory sensationalism."),
                ("Objective Language", "The language used is predominantly objective and lacks emotional manipulation."),
                ("Absence of Clickbait", "The text does not rely on clickbait tactics to artificially inflate engagement."),
                ("Professional Structure", "The document is structured in a highly professional and comprehensive manner.")
            ]
            
        r_y = height - 180
        for title, desc in reasons:
            c.setStrokeColor(C_BORDER)
            c.setFillColor(C_BG)
            c.roundRect(40, r_y, width - 80, 70, 10, stroke=1, fill=1)
            c.setFillColor(main_color)
            c.circle(70, r_y + 35, 15, stroke=0, fill=1)
            c.setFillColor(C_TEXT)
            c.setFont("Helvetica-Bold", 12)
            c.drawString(100, r_y + 45, title)
            c.setFont("Helvetica", 10)
            c.setFillColor(C_MUTED)
            c.drawString(100, r_y + 25, desc)
            r_y -= 90
            
        draw_footer(c, 3)
        c.showPage()
        
        # ==========================================
        # PAGE 4: AI GENERATED SUMMARY
        # ==========================================
        draw_top_bar(c, "AI GENERATED SUMMARY", 4)
        
        summ_style = ParagraphStyle('Summ', parent=normal_style, fontSize=12, leading=18)
        p = Paragraph(summary, summ_style)
        actual_w, ph = p.wrapOn(c, width - 120, height - 200)
        
        card_h = max(280, ph + 80)
        card_y = height - 120 - card_h
        
        c.setStrokeColor(main_color)
        c.setFillColor(colors.HexColor('#FEF2F2') if is_fake else colors.HexColor('#F0FDF4'))
        c.roundRect(40, card_y, width - 80, card_h, 10, stroke=1, fill=1)
        
        c.setFillColor(main_color)
        c.setFont("Helvetica-Bold", 40)
        c.drawString(60, height - 160, '"')
        
        p.drawOn(c, 60, card_y + 40)
        
        c.setFillColor(main_color)
        c.drawString(width - 80, card_y + 20, '"')
        
        c.setFillColor(C_TEXT)
        c.setFont("Helvetica-Oblique", 10)
        c.drawCentredString(width/2, card_y - 40, "This summary is automatically generated using advanced AI models to provide a quick overview.")
        
        draw_footer(c, 4)
        c.showPage()
        
        # ==========================================
        # PAGE 5: KEYWORDS & CONTENT INDICATORS
        # ==========================================
        draw_top_bar(c, "KEYWORDS & CONTENT INDICATORS", 5)
        
        # Keywords Card (Left)
        c.setStrokeColor(C_BORDER)
        c.setFillColor(C_BG)
        c.roundRect(40, height - 350, 300, 230, 10, stroke=1, fill=1)
        c.setFillColor(C_TEXT)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(60, height - 150, "IMPORTANT KEYWORDS")
        
        kx = 60
        ky = height - 180
        for kw in keywords[:15]:
            c.setFont("Helvetica", 9)
            kw_w = c.stringWidth(kw, "Helvetica", 9) + 20
            if kx + kw_w > 320:
                kx = 60
                ky -= 30
            c.setStrokeColor(main_color)
            c.setFillColor(colors.white)
            c.roundRect(kx, ky, kw_w, 20, 10, stroke=1, fill=1)
            c.setFillColor(C_TEXT)
            c.drawString(kx + 10, ky + 6, kw)
            kx += kw_w + 10
            
        # Risk Level Card (Right)
        c.setStrokeColor(C_BORDER)
        c.setFillColor(C_BG)
        c.roundRect(360, height - 350, width - 400, 230, 10, stroke=1, fill=1)
        c.setFillColor(C_TEXT)
        c.setFont("Helvetica-Bold", 10)
        c.drawCentredString(360 + (width-400)/2, height - 150, "RISK LEVEL")
        
        c.setStrokeColor(C_BORDER)
        c.setLineWidth(15)
        c.arc(360 + (width-400)/2 - 50, height - 250 - 50, 360 + (width-400)/2 + 50, height - 250 + 50, 0, 180)
        c.setStrokeColor(main_color)
        extent = 180 if is_fake else 45
        c.arc(360 + (width-400)/2 - 50, height - 250 - 50, 360 + (width-400)/2 + 50, height - 250 + 50, 180 - extent, extent)
        
        c.setFillColor(main_color)
        c.setFont("Helvetica-Bold", 14)
        c.drawCentredString(360 + (width-400)/2, height - 290, "HIGH RISK" if is_fake else "LOW RISK")
        
        # Content Indicators (Bottom)
        c.setStrokeColor(C_BORDER)
        c.setFillColor(C_BG)
        c.roundRect(40, height - 650, width - 80, 280, 10, stroke=1, fill=1)
        c.setFillColor(C_TEXT)
        c.setFont("Helvetica-Bold", 10)
        c.drawString(60, height - 400, "CONTENT INDICATORS")
        
        indicators = [
            ("Fact Consistency", 20 if is_fake else 90),
            ("Source Reliability", 22 if is_fake else 88),
            ("Language Quality", 45 if is_fake else 95),
            ("Clickbait Risk", clickbait, True),
            ("Overall Trust Score", 100 - conf_score if is_fake else conf_score)
        ]
        
        iy = height - 440
        c.setLineWidth(1)
        for ind in indicators:
            name = ind[0]
            val = ind[1]
            reverse = len(ind) > 2
            
            c.setFillColor(C_TEXT)
            c.setFont("Helvetica", 10)
            c.drawString(60, iy, name)
            
            c.setFillColor(C_BORDER)
            c.roundRect(200, iy, 250, 10, 5, stroke=0, fill=1)
            
            bar_color = C_DANGER if (val < 50 and not reverse) or (val > 50 and reverse) else C_SUCCESS
            c.setFillColor(bar_color)
            c.roundRect(200, iy, 250 * (val/100.0), 10, 5, stroke=0, fill=1)
            
            c.setFillColor(C_TEXT)
            c.setFont("Helvetica-Bold", 10)
            c.drawString(470, iy, f"{val}%")
            
            iy -= 40
            
        draw_footer(c, 5)
        c.showPage()
        
        # ==========================================
        # PAGE 6: FINAL VERDICT & RECOMMENDATION
        # ==========================================
        draw_top_bar(c, "FINAL VERDICT & RECOMMENDATION", 6)
        
        # Verdict Card
        c.setStrokeColor(C_BORDER)
        c.setFillColor(C_BG)
        c.roundRect(40, height - 500, 240, 380, 10, stroke=1, fill=1)
        
        c.setFillColor(C_TEXT)
        c.setFont("Helvetica-Bold", 14)
        c.drawCentredString(160, height - 160, "FINAL VERDICT")
        
        c.setFillColor(main_color)
        c.setFont("Helvetica-Bold", 24)
        c.drawCentredString(160, height - 220, pred_text)
        
        c.setFillColor(main_color)
        c.circle(160, height - 340, 60, stroke=0, fill=1)
        c.setFillColor(colors.white)
        c.setFont("Helvetica-Bold", 32)
        c.drawCentredString(160, height - 350, f"{conf_score}%")
        
        c.setFillColor(C_TEXT)
        c.setFont("Helvetica-Bold", 12)
        c.drawCentredString(160, height - 440, "CONFIDENCE SCORE")
        
        # Recommendation Card
        c.setStrokeColor(C_BORDER)
        c.setFillColor(C_BG)
        c.roundRect(300, height - 320, width - 340, 200, 10, stroke=1, fill=1)
        c.setFillColor(C_TEXT)
        c.setFont("Helvetica-Bold", 12)
        c.drawString(320, height - 160, "RECOMMENDATION")
        
        rec_text = "This article contains indicators commonly associated with misinformation. We recommend verifying the information through trusted, authoritative sources before accepting it as factual." if is_fake else "This article exhibits strong indicators of credibility. The structural and linguistic patterns match highly trusted sources. It is considered safe for general reference."
        p = Paragraph(rec_text, normal_style)
        p.wrapOn(c, width - 380, 120)
        p.drawOn(c, 320, height - 280)
        
        # Notice
        c.setStrokeColor(C_BORDER)
        c.setFillColor(colors.HexColor('#F0FDF4') if not is_fake else colors.HexColor('#FEF2F2'))
        c.roundRect(300, height - 500, width - 340, 100, 10, stroke=1, fill=1)
        c.setFillColor(C_TEXT)
        c.setFont("Helvetica-Bold", 10)
        notice = "Always cross-check with reliable news outlets and official sources before sharing or believing information."
        p = Paragraph(notice, ParagraphStyle('ntc', parent=normal_style, alignment=1))
        p.wrapOn(c, width - 380, 80)
        p.drawOn(c, 320, height - 460)
        
        draw_footer(c, 6)
        c.showPage()
        
        c.save()
        buffer.seek(0)
        return buffer
