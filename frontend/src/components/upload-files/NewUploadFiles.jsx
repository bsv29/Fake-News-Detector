import React, { useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography, Link, Button, IconButton, Chip, Alert } from "@mui/material";
import {
    ClearOutlined,
    CloudUpload,
    InsertDriveFile,
    Delete,
    AttachFile,
    PictureAsPdf,
    Image,
    TableChart,
    CloudUploadOutlined,
    FolderOpenOutlined,
    AddOutlined
} from "@mui/icons-material";

const NewUploadFiles = ({
    canUploadRiskFile=true ,
    disabled = false,
     width="60%",
    Icon,
    height,
    padding,
    connectors,
    onFileUpload,
    selectedFiles,
    files,
    setFiles,
    supportedText,
    maxFiles = 1,
    multiple = true,
    Title,
    textColor = "rgba(32, 32, 37, 1)",
    uploadedStatus,
    accept,
    maxsize=10,
    minsize=0,
    onDropRejected,
    enablePreview = false,
    onPreview,
    customEmptyState,
    customFileList,
    dropzoneSx
}) => {
    const [alertopen, setalertopen] = useState(false)
    const [alertmessage, setalertmessage] = useState('')
    const addInputRef = useRef(null);

    const handleDrop = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {

            const MIN_SIZE = minsize * 1024 * 1024;   // 1MB
            const MAX_SIZE = maxsize * 1024 * 1024;  // 10MB

            const validFiles = acceptedFiles.filter(file => {
                if (file.size <= MIN_SIZE) {
                    // alert(`${file.name} must be greater than 1MB`);
                    setalertmessage(`${file.name} must be greater than ${minsize}MB`)
                    setalertopen(true)
                    setTimeout(() => {
                        setalertopen(false)
                        setalertmessage('')
                    }, 3000);
                    return false;
                }
                if (file.size >= MAX_SIZE) {
                    // alert(`${file.name} must be less than 10MB`);
                    setalertmessage(`${file.name} must be less than ${maxsize}MB`)
                    setalertopen(true)
                    setTimeout(() => {
                        setalertopen(false)
                        setalertmessage('')
                    }, 3000);
                    return false;
                }
                return true;
            });

            const newFiles = validFiles.filter(
                (file) => !files?.some((f) => f.name === file.name)
            );

            if (newFiles.length > 0) {
                if (multiple) {
                    setFiles?.((prev) => [...prev, ...newFiles].slice(0, maxFiles));
                } else {
                    setFiles?.(newFiles.slice(0, 1));
                }

                if (onFileUpload) {
                    onFileUpload(newFiles);
                }
            }
        }
    };

    const handleRemoveFile = (indexToRemove) => {
        const newFiles = files?.filter((_, index) => index !== indexToRemove);
        setFiles?.(newFiles);
        if (onFileUpload) {
            onFileUpload(newFiles);
        }
    };

    const handleClearAll = () => {
        setFiles?.([]);
        if (onFileUpload) {
            onFileUpload([]);
        }
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return '';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getFileIcon = (fileName) => {
        if (!fileName) return <AttachFile sx={{ color: '#666', fontSize: '18px' }} />;
        const extension = fileName.split('.').pop()?.toLowerCase();

        switch (extension) {
            case 'pdf':
                return <PictureAsPdf sx={{ color: '#d32f2f', fontSize: '18px' }} />;
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'bmp':
            case 'webp':
                return <Image sx={{ color: '#4caf50', fontSize: '18px' }} />;
            case 'xlsx':
            case 'xls':
            case 'csv':
                return <TableChart sx={{ color: '#2e7d32', fontSize: '18px' }} />;
            case 'doc':
            case 'docx':
                return <InsertDriveFile sx={{ color: '#1976d2', fontSize: '18px' }} />;
            default:
                return <AttachFile sx={{ color: '#666', fontSize: '18px' }} />;
        }
    };

    const getFileTypeLabel = (fileName) => {
        if (!fileName) return { label: 'FILE', color: '#666' };
        const extension = fileName.split('.').pop()?.toLowerCase();

        switch (extension) {
            case 'pdf':
                return { label: 'PDF', color: '#d32f2f' };
            case 'jpg':
            case 'jpeg':
            case 'png':
                return { label: 'IMG', color: '#4caf50' };
            case 'xlsx':
            case 'xls':
                return { label: 'XLS', color: '#2e7d32' };
            case 'csv':
                return { label: 'CSV', color: '#2e7d32' };
            default:
                return { label: extension?.toUpperCase() || 'FILE', color: '#666' };
        }
    };

    const getPreviewName = (file) => file?.name || file?.file_name || '';

    const getPreviewUrl = (file) => {
        if (file instanceof File) return URL.createObjectURL(file);
        if (file?.file instanceof File) return URL.createObjectURL(file.file);
        return file?.file_url || file?.url || file?.download_url || file?.path || file?.preview_url || '';
    };

    const handlePreview = (file) => {
        if (!enablePreview) return;
        if (onPreview) {
            onPreview(file);
            return;
        }
        const name = getPreviewName(file);
        const ext = name.split('.').pop()?.toLowerCase() || '';
        const url = getPreviewUrl(file);
        if (!url) return;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const hasFiles = files && files?.length > 0;

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: canUploadRiskFile ? handleDrop : undefined,
        onDropRejected: (rejectedFiles) => {        // ✅ Add this
            const hasTooMany = rejectedFiles.some(f =>
                f.errors?.some(e => e.code === 'too-many-files')
            );
            const hasInvalidType = rejectedFiles.some(f =>        // ← add this block
                f.errors?.some(e => e.code === 'file-invalid-type')
            );
            if (hasInvalidType) {
                if (onDropRejected) {
                    onDropRejected(rejectedFiles);               // ← bubble up to parent
                } else {
                    const names = rejectedFiles.map(r => r.file?.name).join(', ');
                    setalertmessage(`Unsupported file type(s): ${names}`);
                    setalertopen(true);
                    setTimeout(() => { setalertopen(false); setalertmessage(''); }, 3000);
                }
                return;
            }
            if (hasTooMany) {
                const currentCount = files?.length || 0;
                const remaining = maxFiles - currentCount;
                if (remaining <= 0) {
                    setalertmessage(`You can upload a maximum of ${maxFiles} file${maxFiles > 1 ? 's' : ''}`);
                } else {
                    if (currentCount > 0) {
                        setalertmessage(`You can only add ${remaining} more file${remaining > 1 ? 's' : ''} (MAX ${maxFiles})`);
                    } else {
                        setalertmessage(`You can upload a maximum ${maxFiles} file${maxFiles > 1 ? 's' : ''}`);

                    }
                }
                setalertopen(true);
                setTimeout(() => { setalertopen(false); setalertmessage(''); }, 3000);
            }
        },
        maxFiles: multiple ? maxFiles : 1,
        multiple: multiple,
        accept: accept,
        noClick: !canUploadRiskFile,
        noKeyboard: !canUploadRiskFile,
        noDrag: !canUploadRiskFile,
    });

    return (
        <Box sx={{ borderRadius: "16px", width, ...(disabled && { opacity: 0.5, pointerEvents: 'none', userSelect: 'none' }) }}>
            {alertopen && <Alert severity="error" sx={{
            
                            width: '20%',
                            marginLeft: 'auto',
                            position: 'absolute',
  width: '100%',
  mb: 1,
  position: 'relative',
                            right: 10,
                            top: 10,
                            zIndex: 999999
                        }}>{alertmessage}</Alert>}
            {/* Title */}
            {Title && (
                <Typography
                    sx={{
                        fontSize: "15px",
                        fontWeight: "600",
                        color: textColor,
                        mb: 0.75,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                    }}
                >
                    {files?.length ? uploadedStatus : Title}
                    {!multiple && <span style={{ marginLeft: "3px", color: "#ff5722", fontSize: '11px' }}>*</span>}
                </Typography>
            )}

            {/* Upload Zone */}
            <Box
                {...(canUploadRiskFile ? getRootProps() : {})}
                sx={{
                    border: isDragActive ? "2px dashed #5e83e2" : hasFiles ? "2px solid #e3f2fd" : "2px dashed #ccc",
                    borderRadius: "12px",
                    height: height || "auto",
                    padding: padding || (hasFiles ? "14px" : "20px"),
                    backgroundColor: isDragActive ? "rgba(94, 131, 226, 0.08)" : hasFiles ? "#fafafa" : "rgba(255, 255, 255, 0.8)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: height && !hasFiles ? "center" : "flex-start",
                    boxSizing: "border-box",
                    cursor: canUploadRiskFile ? "pointer" : "default",
                    transition: "all 0.2s ease",
                    "&:hover": {
                        backgroundColor: hasFiles ? "rgba(245, 245, 245, 0.9)" : "rgba(94, 131, 226, 0.04)",
                        borderColor: hasFiles ? "#90caf9" : "#5e83e2",
                    },
                    ...dropzoneSx
                }}
            >
                {canUploadRiskFile && <input {...getInputProps()} style={{ display: 'none' }} />}

                {hasFiles ? (
                    customFileList ? customFileList({ files, handleRemoveFile, getRootProps, getInputProps, formatFileSize }) : (
                    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        {/* File List */}
                        <Box sx={{ maxHeight: height ? `calc(${height} - 80px)` : '150px', overflowY: 'auto', mb: 1.5,
                            '&::-webkit-scrollbar': { width: '6px' },
                            '&::-webkit-scrollbar-thumb': { backgroundColor: '#ccc', borderRadius: '3px', },
                            '&::-webkit-scrollbar-thumb:hover': { backgroundColor: '#b3b3b3' }
                        }}>
                            {files?.map((file, index) => {
                                const fileType = getFileTypeLabel(file.name || file.file_name);
                                return (
                                    <Box
                                        key={index}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePreview(file);
                                        }}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1.25,
                                            p: 1.25,
                                            mb: 1,
                                            backgroundColor: "white",
                                            border: "1px solid #e3f2fd",
                                            borderRadius: "8px",
                                            transition: "all 0.2s ease",
                                            cursor: enablePreview ? "pointer" : "default",
                                            "&:hover": {
                                                backgroundColor: "#f8f9fa",
                                                borderColor: "#90caf9",
                                                "& .delete-btn": {
                                                    opacity: 1
                                                }
                                            }
                                        }}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            {getFileIcon(file.name || file.file_name)}
                                            <Chip
                                                label={fileType.label}
                                                size="small"
                                                sx={{
                                                    backgroundColor: `${fileType.color}15`,
                                                    color: fileType.color,
                                                    fontSize: '10px',
                                                    height: '20px',
                                                    fontWeight: 600
                                                }}
                                            />
                                        </Box>

                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    fontWeight: 600,
                                                    fontSize: "12px",
                                                    color: "#333",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap"
                                                }}
                                            >
                                                {file.name || file.file_name}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    color: "#666",
                                                    fontSize: "10px"
                                                }}
                                            >
                                                {formatFileSize(file.size)}
                                            </Typography>
                                        </Box>

                                        {canUploadRiskFile && (
                                        <IconButton
                                            className="delete-btn"
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveFile(index);
                                            }}
                                            sx={{
                                                opacity: 0.6,
                                                transition: "all 0.2s ease",
                                                color: "#d32f2f",
                                                p: 0.5,
                                                "&:hover": {
                                                    backgroundColor: "rgba(211, 47, 47, 0.1)"
                                                }
                                            }}
                                        >
                                            <Delete sx={{ fontSize: "16px" }} />
                                        </IconButton>
                                        )}
                                    </Box>
                                );
                            })}
                        </Box>

                        {/* Actions */}
                        <Box sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            p: 1.25,
                            backgroundColor: "rgba(94, 131, 226, 0.05)",
                            borderRadius: "6px",mt:"auto"
                        }}>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: "#5e83e2",
                                    fontSize: "11px",
                                    fontWeight: 500
                                }}
                            >
                                {multiple ? `${files?.length}/${maxFiles} files` : "1 file"}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                {canUploadRiskFile && multiple && files?.length < maxFiles && (
                                    <>
                                        <input
                                            ref={addInputRef}
                                            type="file"
                                            multiple={multiple}
                                            accept={accept ? Object.values(accept).flat().join(',') : undefined}
                                            style={{ display: 'none' }}
                                            onChange={(e) => {
                                                if (e.target.files) {
                                                    handleDrop(Array.from(e.target.files));
                                                    e.target.value = '';
                                                }
                                            }}
                                        />
                                        <Button
                                            size="small"
                                            startIcon={<AddOutlined sx={{ fontSize: '13px' }} />}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addInputRef.current?.click();
                                            }}
                                            sx={{
                                                color: '#5e83e2',
                                                textTransform: 'none',
                                                border: '1px solid rgba(94, 131, 226, 0.2)',
                                                height: '26px',
                                                fontSize: '11px',
                                                px: 1.75,
                                                minWidth: 'auto',
                                                fontWeight: 500,
                                                '&:hover': {
                                                    bgcolor: 'rgba(94, 131, 226, 0.08)'
                                                }
                                            }}
                                        >
                                            Add File
                                        </Button>
                                    </>
                                )}
                                {canUploadRiskFile && multiple && files?.length > 0 && (
                                    <Button
                                        size="small"
                                        startIcon={<ClearOutlined sx={{ fontSize: '11px' }} />}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleClearAll();
                                        }}
                                        sx={{
                                            color: '#d32f2f',
                                            textTransform: 'none',
                                            height: '26px',
                                            fontSize: '11px',
                                            px: 1.75,
                                            minWidth: 'auto',
                                            fontWeight: 500,
                                            border: '1px solid rgba(211, 47, 47, 0.2)',
                                            '&:hover': {
                                                bgcolor: 'rgba(211, 47, 47, 0.08)'
                                            }
                                        }}
                                    >
                                        Clear All
                                    </Button>
                                )}
                            </Box>
                        </Box>
                    </Box>
                    )
                ) : canUploadRiskFile ? (
                    /* Empty State */
                    customEmptyState ? customEmptyState({ isDragActive }) : (
                    <Box sx={{ textAlign: "center", py: height ? 0 : 1.5, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1.25, mb: 1.25 }}>
                            <Box
                                sx={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: "8px",
                                    background: "#FFFFFF",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                            >
                                <CloudUploadOutlined sx={{ fontSize: 26, color: "#68BFEE" }} />
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    color: "#2a3547"
                                }}
                            >
                                {isDragActive ? "Drop here!" : `Drop ${multiple && maxFiles>1 ? "files" : "file"} or`}
                            </Typography>
                            {!isDragActive && (
                                <Link
                                    component="span"
                                    sx={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        textDecoration: "none",
                                        gap: 0.5,
                                        color: "#fff",
                                        background: "linear-gradient(135deg, #68BFEE 0%, #5B80E9 100%)",
                                        px: 1.75,
                                        py: 0.6,
                                        fontSize: "13px",
                                        borderRadius: "20px",
                                        fontWeight: 600,
                                        cursor: "pointer",
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                            transform: "translateY(-1px)",
                                            boxShadow: "0 4px 8px rgba(104, 191, 238, 0.3)"
                                        }
                                    }}
                                >
                                    <FolderOpenOutlined sx={{ fontSize: 15 }} />
                                    Browse
                                </Link>
                            )}
                        </Box>

                        {/* {multiple && (
                            <Typography
                                variant="caption"
                                sx={{
                                    color: "#148EC3",
                                    fontSize: "11px",
                                    fontWeight: 600,
                                    display: "block",
                                    mb: 1
                                }}
                            >
                                Max {maxFiles} files
                            </Typography>
                        )} */}

                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: "11px",
                                color: "rgba(42, 53, 71, 0.5)",
                                lineHeight: 1.4
                            }}
                        >
                            {supportedText || "doc, docx, pdf (Max 10MB each)"}
                        </Typography>
                    </Box>
                    )
                ) : null}
            </Box>
        </Box>
    );
};

export default NewUploadFiles;